import {ToastController} from '@ionic/angular';
const toastCtrl = new ToastController();
export class Alert {

    public static async toast(toastMsg:string,msgType:MsgType) {
        const toast =await toastCtrl.create({
            message: toastMsg,
            duration: 2000,
            position: 'bottom',
            color: msgType===MsgType.positive?'success':'danger',
            animated:true,
            translucent:true
        });
        await toast.present();
    }

}
export enum MsgType {
    positive = 'positive', negative = 'negative'
}
