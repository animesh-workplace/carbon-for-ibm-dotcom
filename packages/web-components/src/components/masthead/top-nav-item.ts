/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { property, query, customElement } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import BXHeaderNavItem from 'carbon-web-components/es/components/ui-shell/header-nav-item.js';
import styles from './masthead.scss';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Masthead top nav item.
 *
 * @element dds-top-nav-item
 */
@customElement(`${ddsPrefix}-top-nav-item`)
class DDSTopNavItem extends BXHeaderNavItem {
  /**
   * The `<a>`.
   */
  @query('[part="link"]')
  private _linkNode?: HTMLAnchorElement;

  /**
   * `true` if this nav item should be in its active state.
   */
  @property({ type: Boolean, reflect: true })
  active = false;

  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has('active')) {
      const { active, _linkNode: linkNode } = this;
      if (linkNode) {
        linkNode.setAttribute('data-selected', String(Boolean(active)));
      }
    }
  }

  firstUpdated() {
    this.shadowRoot?.querySelectorAll('[role="menuitem"]').forEach(menuItem => menuItem.removeAttribute('role'));

    if (this.hasAttribute('role') && this.getAttribute('role') === 'listitem') {
      this.removeAttribute('role');
    }
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSTopNavItem;
