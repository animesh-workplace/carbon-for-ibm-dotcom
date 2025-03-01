/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement, html, css, state, TemplateResult } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import DDSContentItem from '../content-item/content-item';

import styles from './cta-block.scss';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * The table mapping slot name with the private property name that indicates the existence of the slot content.
 */
const slotExistencePropertyNames = {
  media: '_hasMedia',
  statistic: '_hasStatistic',
  footer: '_hasFooter',
};

/**
 * The CTA BLOCK ITEM component
 *
 * @element dds-cta-block-item
 * @slot statistics
 * @slot media
 * @slot heading
 * @slot .
 * @slot footer
 */
@customElement(`${ddsPrefix}-cta-block-item`)
class DDSCTABlockItem extends StableSelectorMixin(DDSContentItem) {
  /**
   * `true` if there are CTA media in the content item area.
   */
  @state()
  protected _hasMedia = false;

  /**
   * `true` if there are CTA statistic in the content item area.
   */
  @state()
  protected _hasStatistic = false;

  /**
   * Handles `slotchange` event.
   *
   * @param event The event.
   */
  protected _handleSlotChange({ target }: Event) {
    const { name } = target as HTMLSlotElement;
    const hasContent = (target as HTMLSlotElement)
      .assignedNodes()
      .filter(elem => !(elem as HTMLElement).matches?.((this.constructor as typeof DDSCTABlockItem).selectorButtonGroup))
      .some(node => node.nodeType !== Node.TEXT_NODE || node!.textContent!.trim());
    this[slotExistencePropertyNames[name] || '_hasStatistic'] = hasContent;
  }

  /**
   * @returns The statistic content items
   */
  protected _renderStatistic(): TemplateResult | string | void {
    const { _hasStatistic: hasStatistic, _handleSlotChange: handleSlotChange } = this;
    return html`
      <div ?hidden="${!hasStatistic}" class="${prefix}--cta-block-item__statitics">
        <slot name="statistics" @slotchange="${handleSlotChange}"></slot>
      </div>
    `;
  }

  /**
   * @returns The media content items
   */
  protected _renderMedia(): TemplateResult | string | void {
    const { _hasMedia: hasMedia, _handleSlotChange: handleSlotChange } = this;

    return html`
      <div ?hidden="${!hasMedia}" class="${prefix}--cta-block-item__media">
        <slot name="media" @slotchange="${handleSlotChange}"></slot>
      </div>
    `;
  }

  render() {
    return html`
      ${this._renderStatistic()} ${this._renderMedia()}
      <slot name="heading"></slot>
      ${super._renderBody()}${super._renderFooter()}
    `;
  }

  static get stableSelector() {
    return `${ddsPrefix}--cta-block-item`;
  }

  // `styles` here is a `CSSResult` generated by custom WebPack loader
  static get styles() {
    return css`${super.styles}${styles}`;
  }
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSCTABlockItem;
