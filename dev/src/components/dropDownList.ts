
/**
 * Component taken from Daisy UI
 *
 * <!-- change popover-1 and --anchor-1 names. Use unique names for each dropdown -->
 * <button class="btn" popovertarget="popover-1" style="anchor-name:--anchor-1">
 *     Button
 * </button>
 * <ul class="dropdown menu w-52 rounded-box bg-base-100 shadow-sm"
 *     popover id="popover-1" style="position-anchor:--anchor-1">
 *     <li><a>Item 1</a></li>
 *     <li><a>Item 2</a></li>
 * </ul>
 */

const newAnchor = (name:string) => {
    const anchor = document.createElement('a');
    anchor.setAttribute('data-continent',name);
    anchor.textContent = name;
    return anchor;
}

export const dropList = (title: string, targetID: number, list: string[]): HTMLElement[] => {
    const dropBtn = document.createElement('button');
    const ulList = document.createElement('ul');

    dropBtn.className = 'btn dropdownBtn';
    dropBtn.setAttribute("popovertarget", `popover-${targetID}`);
    dropBtn.style.anchorName = `--anchor-${targetID}`;
    dropBtn.textContent = title;

    ulList.className = 'dropdownItems dropdown menu w-52 rounded-box bg-base-100 shadow-sm';
    ulList.setAttribute('popover','');
    ulList.id = `popover-${targetID}`;
    ulList.style.positionAnchor = `--anchor-${targetID}`

    list.forEach( item => {
        const li = document.createElement('li');
        li.appendChild(newAnchor(item));
        ulList.appendChild(li);
    });

    return [dropBtn,ulList];
}

