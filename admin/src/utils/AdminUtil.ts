import {request, useNotification, useOverlayBlocker} from '@strapi/helper-plugin'

export class AdminUtil {
  static async handleSubmitMessage(route: string, body: Record<any, any>) {
    const toggleNotification = useNotification();
    const { lockApp, unlockApp } = useOverlayBlocker();

    lockApp && lockApp()

    const res: Record<any, any> = await request(route, {body: JSON.stringify(body), method: 'POST'})

    unlockApp && unlockApp()

    toggleNotification({message: JSON.stringify(res.message, null, 2)})
  }
}