import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';
import {
  createInternalSidebar,
  createPublicSidebar,
} from './sidebars.shared';

const sidebars: SidebarsConfig = {
  internalSidebar: createInternalSidebar('internal/'),
  publicSidebar: createPublicSidebar('public/'),
};

export default sidebars;
