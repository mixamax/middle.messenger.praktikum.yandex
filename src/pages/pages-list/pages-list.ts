import Block from "../../core/Block";
import { navigate } from "../../core/navigate";

interface IProps {
    events: {
        click: (e: Event) => void;
    };
}

type Refs = {};

class PagesList extends Block<IProps, Refs> {
    constructor(props: IProps) {
        super({
            ...props,
            events: {
                click: (e) => {
                    const element = e.target as HTMLElement;
                    navigate(element.id);
                },
            },
        });
    }

    protected render(): string {
        return `
           <nav class="pages-list">
               <ul>
                   <li><a id="login" class="pages-list-page" href="#">Login page</a></li>
                   <li><a href="#" id="auth" class="pages-list-page">Auth page</a></li>
                   <li><a href="#" id="chatPage" class="pages-list-page">Chat page</a></li>
                   <li><a href="#" id="profilePage" class="pages-list-page">Profile page</a></li>
                   <li><a href="#" id="changeProfileDataPage" class="pages-list-page">Profile page change data</a></li>
                   <li><a href="#" id="changePassPage" class="pages-list-page">Profile page change password</a></li>
                   <li><a href="#" id="page404" class="pages-list-page">404 page</a></li>
                   <li><a href="#" id="page500" class="pages-list-page">500 page</a></li>
               </ul>
           </nav>
        `;
    }
}
export default PagesList;
