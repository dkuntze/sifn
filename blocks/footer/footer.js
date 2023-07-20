import { readBlockConfig, decorateIcons } from '../../scripts/lib-franklin.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  const cfg = readBlockConfig(block);
  block.textContent = '';

  // fetch footer content
  const footerPath = cfg.footer || '/footer';
  const resp = await fetch(`${footerPath}.plain.html`, window.location.pathname.endsWith('/footer') ? { cache: 'reload' } : {});

  if (resp.ok) {
    const html = await resp.text();

    // decorate footer DOM
    const footer = document.createElement('div');
    const socialIcons = document.createElement('div');
    const footerInfo = document.createElement('div');
    const subfooter = document.createElement('div');
    subfooter.classList.add('sub-footer');
    const sfDiv = document.createElement('div');
    subfooter.append(sfDiv);
    footerInfo.classList.add('footer-info');
    socialIcons.classList.add('social-icons');
    footer.innerHTML = html;

    footerInfo.append(footer.querySelector('p'));
    socialIcons.append(footer.querySelector('ul:nth-child(2)'));

    socialIcons.querySelectorAll('a').forEach((a) => {
      if (a.textContent === 'Facebook') {
        a.closest('li').classList.add('ic-facebook');
        const fbSpan = document.createElement('span');
        fbSpan.textContent = a.textContent;
        a.textContent = '';
        a.append(fbSpan);
      }

      if (a.textContent === 'Instagram') {
        a.closest('li').classList.add('ic-instagram');
        const igSpan = document.createElement('span');
        igSpan.textContent = a.textContent;
        a.textContent = '';
        a.append(igSpan);
      }

      if (a.textContent === 'Twitter') {
        a.closest('li').classList.add('ic-twitter');
        const twSpan = document.createElement('span');
        twSpan.textContent = a.textContent;
        a.textContent = '';
        a.append(twSpan);
      }
    });

    decorateIcons(footer);
    block.append(footer);
    sfDiv.append(footerInfo);
    sfDiv.append(socialIcons);
    block.parentNode.insertAdjacentElement('afterend', subfooter);
  }
}
