import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';
import {createPublicSidebar} from './sidebars.shared';

const sidebars: SidebarsConfig = {
  publicSidebar: createPublicSidebar(),
};

export default sidebars;
