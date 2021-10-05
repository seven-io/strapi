import {request} from 'strapi-helper-plugin'

export class AdminUtil {
    static async handleSubmitMessage(route, body) {
        strapi.lockApp()

        const {message} = await request(route, {body, method: 'POST'})

        strapi.unlockApp()

        strapi.notification.toggle({message: JSON.stringify(message, null, 2)})
    }
}
