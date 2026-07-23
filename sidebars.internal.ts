import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';
import {createInternalSidebar} from './sidebars.shared';

const sidebars: SidebarsConfig = {
  internalSidebar: createInternalSidebar(),
};

export default sidebars;
