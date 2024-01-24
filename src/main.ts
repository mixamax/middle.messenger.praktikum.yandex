import "./style.css";
import Handlebars from "handlebars";
import * as Components from "./components";
import { registerComponent } from "./core/registerComponent";
import { navigate } from "./core/navigate";

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

document.addEventListener("DOMContentLoaded", () => navigate("pagesList"));
