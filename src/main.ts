import "./style.css";
import Handlebars from "handlebars";
import * as Components from "./components";
import { registerComponent } from "./core/registerComponent";
import * as Pages from "./pages";
import router from "./core/router";
import { initAppService } from "./services/initAppService";

Object.entries(Components).forEach(([name, component]) =>
    Handlebars.registerPartial(name, component)
);

//************************************************************************* */
registerComponent("Input", Components.Input);
registerComponent("InputWithLabel", Components.InputWithLabel);
registerComponent("InputForm", Components.InputForm);
registerComponent("MainButton", Components.MainButton);
registerComponent("FormErrMessage", Components.FormErrMessage);
registerComponent("ChangeDataItem", Components.ChangeDataItem);
registerComponent("LeftBarHeader", Components.LeftBarHeader);
registerComponent("ChatsList", Components.ChatsList);
registerComponent("ChatsListItem", Components.ChatsListItem);
registerComponent("PopUp", Components.PopUp);
registerComponent("WindowFooter", Components.WindowFooter);
registerComponent("WindowHeader", Components.WindowHeader);
registerComponent("Modal", Components.Modal);
registerComponent("MessageField", Components.MessageField);
registerComponent("LeftBarBackButton", Components.LeftBarBackButton);
registerComponent("Notification", Components.Notification);
registerComponent("ProfileDataItem", Components.ProfileDataItem);
registerComponent("ProfilePageAvatar", Components.ProfilePageAvatar);
registerComponent("ModalAvatar", Components.ModalAvatar);

router
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    .use("/", Pages.LoginPage)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    .use("/sign-up", Pages.AuthPage)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    .use("/settings", Pages.ProfilePage)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    .use("/messanger", Pages.ChatPage)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    .use("/settings/changeprofile", Pages.ChangeProfileDataPage)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    .use("/settings/changepass", Pages.ChangePassPage)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    .use("/404", Pages.Page404)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    .use("/500", Pages.Page500);
console.log(typeof router.routes[0]);

router.start();

document.addEventListener("DOMContentLoaded", () => initAppService());
