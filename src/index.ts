import btoa from 'btoa'
import puppeteer from 'puppeteer'
import {intercept, patterns} from 'puppeteer-interceptor'
import * as path from 'path'

const setupInterceptions = (page: puppeteer.Page): void => {
    // Fulfill requests without sending them to the server
    intercept(page as any, patterns.All('*data.txt'), {
        onInterception: (requestEvent, {fulfill}) => {
            console.log('onInterception', {requestEvent})
            fulfill(200, {body: btoa('consider yourself fulfilled')})
        },
    })

    // After letting requests pass through to the server, edit the response
    intercept(page as any, patterns.All('*data2.txt'), {
        onResponseReceived: responseEvent => {
            console.log('onResponseReceived', {responseEvent})
            responseEvent.response.body = 'Ye olde modified body ' + responseEvent.response.body
            return responseEvent.response
        }
    })
}

const main = async () => {

    const pathToExtension = path.resolve(__dirname, '..', 'my-browser-ext')
    const browser = await puppeteer.launch({
        headless: false,
        devtools: true,
        args: [
            `--disable-extensions-except=${pathToExtension}`,
            `--load-extension=${pathToExtension}`
        ]
    })

    // Intercept request from testpage in a browser tab
    const browserPage = await browser.newPage()
    setupInterceptions(browserPage)
    await browserPage.goto('http://localhost:5000')

    // Intercept requests from my-browser-ext
    for (const target of await browser.targets()) {
        if (target.type() === 'background_page') {
            setupInterceptions(await target.page())
        }
    }

}

main()
