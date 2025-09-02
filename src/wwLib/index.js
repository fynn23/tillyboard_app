import emitter from 'tiny-emitter/instance';
import services from './services/index.js';
import { useIconsStore } from '@/pinia/icons';

 /* wwFront:start */
// eslint-disable-next-line no-undef
import plugin_cabb43dd_6161_4140_8ebf_03b6fb045a0b from '@/components/plugins/plugin-cabb43dd-6161-4140-8ebf-03b6fb045a0b/src/wwPlugin.js';
import plugin_8bc1b5c9_29e4_4269_becb_a2e1a8de9127 from '@/components/plugins/plugin-8bc1b5c9-29e4-4269-becb-a2e1a8de9127/src/wwPlugin.js';
import plugin_832d6f7a_42c3_43f1_a3ce_9a678272f811 from '@/components/plugins/plugin-832d6f7a-42c3-43f1-a3ce-9a678272f811/src/wwPlugin.js';
import plugin_69d4a5bb_09a3_4f3d_a94e_667c21c057eb from '@/components/plugins/plugin-69d4a5bb-09a3-4f3d-a94e-667c21c057eb/src/wwPlugin.js';
import plugin_1fa0dd68_5069_436c_9a7d_3b54c340f1fa from '@/components/plugins/plugin-1fa0dd68-5069-436c-9a7d-3b54c340f1fa/src/wwPlugin.js';
import plugin_f9ef41c3_1c53_4857_855b_f2f6a40b7186 from '@/components/plugins/plugin-f9ef41c3-1c53-4857-855b-f2f6a40b7186/src/wwPlugin.js';
import plugin_2bd1c688_31c5_443e_ae25_59aa5b6431fb from '@/components/plugins/plugin-2bd1c688-31c5-443e-ae25-59aa5b6431fb/src/wwPlugin.js';
import plugin_66a79c98_70e7_4bc4_8859_20776b024ec2 from '@/components/plugins/plugin-66a79c98-70e7-4bc4-8859-20776b024ec2/src/wwPlugin.js';
import plugin_d66a250d_8468_469e_ad33_ee028f632398 from '@/components/plugins/plugin-d66a250d-8468-469e-ad33-ee028f632398/src/wwPlugin.js';
import plugin_00d22f72_1a03_44f8_ad68_c593dc80b543 from '@/components/plugins/plugin-00d22f72-1a03-44f8-ad68-c593dc80b543/src/wwPlugin.js';
import plugin_3a407b45_9c63_471d_b09b_15cf797e5566 from '@/components/plugins/plugin-3a407b45-9c63-471d-b09b-15cf797e5566/src/wwPlugin.js';
import plugin_ee24f5ac_e15e_4ddd_baa4_0b4baedf90c9 from '@/components/plugins/plugin-ee24f5ac-e15e-4ddd-baa4-0b4baedf90c9/src/wwPlugin.js';
import plugin_2adce8d5_2056_479d_a21a_068f55a8077f from '@/components/plugins/plugin-2adce8d5-2056-479d-a21a-068f55a8077f/src/wwPlugin.js';
import plugin_9c40819b_4a8f_468f_9ba5_4b9699f3361f from '@/components/plugins/plugin-9c40819b-4a8f-468f-9ba5-4b9699f3361f/src/wwPlugin.js';
/* wwFront:end */

import { computed, reactive } from 'vue';

export default {
    ...services,
     $on(event, fn) {
        emitter.on(event, fn);
    },
    $once(event, fn) {
        emitter.once(event, fn);
    },
    $emit(event, ...args) {
        if (!event) {
            return;
        }
        emitter.emit(event, ...args);
    },
    $off(event, fn) {
        emitter.off(event, fn);
    },
     front: {},
    $focus: null,
    env: process.env.NODE_ENV,
    async initFront({ router, store }) {
 
        this.front.router = router;
        /* wwFront:start */
        this.$store = store;
        /* wwFront:end */

        //Init services
        this.wwLog.init();

 
        wwLib.logStore.verbose('Starting the application...');
        await this.wwWebsiteData.init();
        this.wwLang.init(router);

        /* wwFront:start */
        // eslint-disable-next-line no-undef
        wwLib.wwPluginHelper.registerPlugin('plugin-cabb43dd-6161-4140-8ebf-03b6fb045a0b', plugin_cabb43dd_6161_4140_8ebf_03b6fb045a0b);
wwLib.wwPluginHelper.registerPlugin('plugin-8bc1b5c9-29e4-4269-becb-a2e1a8de9127', plugin_8bc1b5c9_29e4_4269_becb_a2e1a8de9127);
wwLib.wwPluginHelper.registerPlugin('plugin-832d6f7a-42c3-43f1-a3ce-9a678272f811', plugin_832d6f7a_42c3_43f1_a3ce_9a678272f811);
wwLib.wwPluginHelper.registerPlugin('plugin-69d4a5bb-09a3-4f3d-a94e-667c21c057eb', plugin_69d4a5bb_09a3_4f3d_a94e_667c21c057eb);
wwLib.wwPluginHelper.registerPlugin('plugin-1fa0dd68-5069-436c-9a7d-3b54c340f1fa', plugin_1fa0dd68_5069_436c_9a7d_3b54c340f1fa);
wwLib.wwPluginHelper.registerPlugin('plugin-f9ef41c3-1c53-4857-855b-f2f6a40b7186', plugin_f9ef41c3_1c53_4857_855b_f2f6a40b7186);
wwLib.wwPluginHelper.registerPlugin('plugin-2bd1c688-31c5-443e-ae25-59aa5b6431fb', plugin_2bd1c688_31c5_443e_ae25_59aa5b6431fb);
wwLib.wwPluginHelper.registerPlugin('plugin-66a79c98-70e7-4bc4-8859-20776b024ec2', plugin_66a79c98_70e7_4bc4_8859_20776b024ec2);
wwLib.wwPluginHelper.registerPlugin('plugin-d66a250d-8468-469e-ad33-ee028f632398', plugin_d66a250d_8468_469e_ad33_ee028f632398);
wwLib.wwPluginHelper.registerPlugin('plugin-00d22f72-1a03-44f8-ad68-c593dc80b543', plugin_00d22f72_1a03_44f8_ad68_c593dc80b543);
wwLib.wwPluginHelper.registerPlugin('plugin-3a407b45-9c63-471d-b09b-15cf797e5566', plugin_3a407b45_9c63_471d_b09b_15cf797e5566);
wwLib.wwPluginHelper.registerPlugin('plugin-ee24f5ac-e15e-4ddd-baa4-0b4baedf90c9', plugin_ee24f5ac_e15e_4ddd_baa4_0b4baedf90c9);
wwLib.wwPluginHelper.registerPlugin('plugin-2adce8d5-2056-479d-a21a-068f55a8077f', plugin_2adce8d5_2056_479d_a21a_068f55a8077f);
wwLib.wwPluginHelper.registerPlugin('plugin-9c40819b-4a8f-468f-9ba5-4b9699f3361f', plugin_9c40819b_4a8f_468f_9ba5_4b9699f3361f);
        /* wwFront:end */

 
        services.scrollStore.start();
        services.keyboardEventStore.start();
    },
     // TODO: Verify with Alexis, still uses wwImageMultiLang
    getResponsiveStyleProp({ store, style, uid, states = [], prop }) {
        store = store || wwLib.getFrontWindow().wwLib.$store;
        if (!style && uid) {
            const wwObject = this.$store.getters['websiteData/getWwObjects'][uid];
            if (!wwObject) return '';
            style = (wwObject._state || {}).style || {};
        }

        const screenSizes = store.getters['front/getScreenSizes'];
        const screenSize = store.getters['front/getScreenSize'];

        let value = '';

        for (const media in screenSizes) {
            if (style[media] && typeof style[media][prop] !== 'undefined') {
                value = style[media][prop];
            }
            if (media === screenSize) {
                break;
            }
        }
        for (const state of states) {
            for (const media in screenSizes) {
                if (style[`${state}_${media}`] && style[`${state}_${media}`][prop]) {
                    value = style[`${state}_${media}`][prop];
                }
                if (media === screenSize) {
                    break;
                }
            }
        }

        return value;
    },
    globalContext: reactive({
        page: computed(() => {
            const page = wwLib.$store.getters['websiteData/getPage'];
            if (!page) return {};
            else if (!page.cmsDataSetPath) return { ...pageSanitizer(page) };
            return { ...pageSanitizer(page), data: wwLib.$store.getters['data/getPageCollectionData'] };
        }),
        pageParameters: computed(() => {
            const pageParameters = Object.values(wwLib.$store.getters['data/getPageParameterVariables']);
            const pageParametersValueMap = {};
            for (const pageParameter of pageParameters) pageParametersValueMap[pageParameter.id] = pageParameter.value;
            return pageParametersValueMap;
        }),
        pages: computed(() => {
            const pages = wwLib.$store.getters['websiteData/getPages'];
            const pagesValueMap = {};
            for (const page of pages) pagesValueMap[page.id] = pageSanitizer(page);
            return pagesValueMap;
        }),
        colors: computed(() => {
            const theme = wwLib.$store.getters['front/getTheme'];
             /* wwFront:start */
            // eslint-disable-next-line no-unreachable, no-undef
            return theme === 'dark' ? {"16c4d794-61b4-42de-bb3b-362edcf8ee7c":"#D7092F","59852ecd-5a92-4443-bf9e-eaa9ad8410c4":"#FFFFFF00","5e4237cb-ec6a-4e6a-acae-5994a742f412":"#2afc85","8055be60-546f-4db3-b193-52953d75bd41":"#F2F2F2","f151d6c7-6682-4d89-8570-e05d0f7fd1ad":"#0def6a","ee02b5da-5e5c-4d1b-aff9-f155e81eab15":"#08A74E","40bf0347-1126-480e-b4b9-94870c2986f8":"#F2F2F2","a6f61f39-44a0-46ce-9822-571fbcd2e677":"#E6E6E6","2d5a3086-6cc1-40d4-bfbb-ebce78d79a85":"#E8E8E8","e8ef8faa-9edc-4541-955c-2f9a8ccdc182":"#FBECC5","d019d8b3-a221-4b6e-a2a1-bf1215027132":"#FBD0D8","f8696411-e330-45b3-92cc-f53b0c74aa99":"#FFFFFF","89dc12a0-8aa2-4fc0-a05a-0375247e61f2":"#000000","23a60d41-ad61-4796-8581-b4d748bcdb98":"#FFFFFF","0b0fa43a-35fd-4d4b-af22-21ad30bebd18":"#FFFFFF","76f03557-cf41-4304-804a-5bc906165008":"#121212","fb44493b-a201-433b-972d-ca021bb29425":"#FFFFFF4D","72830a5b-4c67-4f2e-8706-890704044b37":"#787878","d058cf75-1a5d-4145-9030-91e1230217d0":"#0A0A0A","b8d837b6-9d07-45c0-94b6-d46b92a978bd":"#54545459","9165ba64-6482-4f33-b696-582e0e2c0470":"#00000026","2dadd54a-a5bf-494a-894b-7c63db3e55e3":"#E8E8E8","8dcbd97f-c9bd-4970-add2-055b3ffecdd1":"#EDEDED","60275b17-fdbb-488a-8ba3-d15f5331a1cb":"#2B2B2B","9f128241-a063-4e89-96ac-2ac9187e2bcd":"#F4D80B","2303a24d-b867-4c4f-8658-e8681602acb4":"#575757","8ff163b3-4425-4c89-aa7d-32f7b4108b2a":"#0A0D120D","40f8f271-10ea-4840-b69a-b558307f6f26":"#363535","4288d6a8-3ca1-4a1f-bc08-0a09083f43e5":"#824cf6","52736933-85eb-4668-acd7-ad16325488e3":"#F2F2F2","5d09efb9-6dc7-473f-8307-832db2f04d70":"#1f97f4","7d87c17b-fd19-444a-9b4a-bb2151e9f9a2":"#0A0D120D","3f303909-1ed6-477e-91e4-419dcc1b60af":"#0A0D121A","553251be-376d-4471-85fd-dc037b6f7344":"#0DEF6A4D","0a47be15-8955-4a04-8861-a09ac5b6a842":"#FAFAFA","59c8efc5-263d-41ee-87ed-1ea77ed9c8b9":"#A4A7AE","f7e2c87a-46f8-44bf-b140-b2acd3d179cf":"#414651","4bd3472b-3597-41fc-a84d-e88a9e3b8b20":"#0A0D1214"} : {"16c4d794-61b4-42de-bb3b-362edcf8ee7c":"#D92D20","59852ecd-5a92-4443-bf9e-eaa9ad8410c4":"#FFFFFF00","5e4237cb-ec6a-4e6a-acae-5994a742f412":"#2afc85","8055be60-546f-4db3-b193-52953d75bd41":"#F2F2F2","f151d6c7-6682-4d89-8570-e05d0f7fd1ad":"#0def6a","ee02b5da-5e5c-4d1b-aff9-f155e81eab15":"#08A74E","40bf0347-1126-480e-b4b9-94870c2986f8":"#F2F2F2","a6f61f39-44a0-46ce-9822-571fbcd2e677":"#E6E6E6","2d5a3086-6cc1-40d4-bfbb-ebce78d79a85":"#E8E8E8","e8ef8faa-9edc-4541-955c-2f9a8ccdc182":"#FBECC5","d019d8b3-a221-4b6e-a2a1-bf1215027132":"#FBD0D8","f8696411-e330-45b3-92cc-f53b0c74aa99":"#12142D","89dc12a0-8aa2-4fc0-a05a-0375247e61f2":"#F6F6F6","23a60d41-ad61-4796-8581-b4d748bcdb98":"#000000","0b0fa43a-35fd-4d4b-af22-21ad30bebd18":"#12142DF2","76f03557-cf41-4304-804a-5bc906165008":"#FFFFFF","fb44493b-a201-433b-972d-ca021bb29425":"#12142D4D","72830a5b-4c67-4f2e-8706-890704044b37":"#787878","d058cf75-1a5d-4145-9030-91e1230217d0":"#fafafa","b8d837b6-9d07-45c0-94b6-d46b92a978bd":"#00000066","9165ba64-6482-4f33-b696-582e0e2c0470":"#00000026","2dadd54a-a5bf-494a-894b-7c63db3e55e3":"#E8E8E8","8dcbd97f-c9bd-4970-add2-055b3ffecdd1":"#EDEDED","60275b17-fdbb-488a-8ba3-d15f5331a1cb":"#f2f2f2","9f128241-a063-4e89-96ac-2ac9187e2bcd":"#F4D80B","2303a24d-b867-4c4f-8658-e8681602acb4":"#e5e5e5","8ff163b3-4425-4c89-aa7d-32f7b4108b2a":"#0A0D120D","40f8f271-10ea-4840-b69a-b558307f6f26":"#DDDDDF","4288d6a8-3ca1-4a1f-bc08-0a09083f43e5":"#824cf6","52736933-85eb-4668-acd7-ad16325488e3":"#F2F2F2","5d09efb9-6dc7-473f-8307-832db2f04d70":"#1f97f4","7d87c17b-fd19-444a-9b4a-bb2151e9f9a2":"#0A0D120D","3f303909-1ed6-477e-91e4-419dcc1b60af":"#0A0D121A","553251be-376d-4471-85fd-dc037b6f7344":"#0DEF6A4D","0a47be15-8955-4a04-8861-a09ac5b6a842":"#FAFAFA","59c8efc5-263d-41ee-87ed-1ea77ed9c8b9":"#A4A7AE","f7e2c87a-46f8-44bf-b140-b2acd3d179cf":"#414651","4bd3472b-3597-41fc-a84d-e88a9e3b8b20":"#0A0D1214"};
            /* wwFront:end */
        }),
        spacings:
         /* wwFront:start */
        // eslint-disable-next-line no-unreachable, no-undef
        {"3381c88c-5294-4ce2-b627-2304df942f35":"8px","30b11e29-bf67-4428-8a33-3c349b0a88ab":"12px","59c772f0-278d-4092-9469-3cbbf621c962":"16px","d788dc9a-ce74-4445-b27c-e3896b866b16":"2px","e809a7ff-7d93-4cf6-99bd-a81ddd8605cb":"24px","f1288acb-d485-44a5-83d9-497aa66c9671":"10px","143da292-0fc5-4963-a70e-e0ef0412eb2c":"8px","c8654075-d5c9-41c6-aa1a-97b66603e0a3":"6px"},
        /* wwFront:end */
        typographies:
         /* wwFront:start */
        // eslint-disable-next-line no-unreachable, no-undef
        {"8adf78e7-1bf1-4dbf-b182-d8d6480fe093":"400 26px/normal var(--ww-default-font-family, sans-serif)","f62528b7-7267-44e4-a18d-b7188f58bf79":"400 26px/normal var(--ww-default-font-family, sans-serif)","3fe0aff6-a9fe-4e2a-8c1d-c007188db54b":"400 20px/normal var(--ww-default-font-family, sans-serif)","75c5b82c-2cbe-486d-adbc-9c705eb9286d":"600 10px/normal var(--ww-default-font-family, sans-serif)","98c48759-25f1-43fb-89e7-d9202ad241e2":"400 15px/110% var(--ww-default-font-family, sans-serif)","37d775b0-6a10-4d42-a35e-07b170314b95":"500 14px/normal 'Poppins New', sans-serif","935f9435-df92-4572-a7fe-db4014bc43c4":"700 14px/normal var(--ww-default-font-family, sans-serif)","866c4310-bd37-40ee-ab03-c98bd6b6d73a":"700 20px/normal var(--ww-default-font-family, sans-serif)","f6b458b2-ebf0-4a5a-b2fa-66f1b0b2e01a":"400 14px/normal 'Poppins', sans-serif","29c04476-14c8-4eb5-bd31-df7b3f8f71d2":"700 40px/normal 'Poppins New', sans-serif","8eaa82ee-d2ad-4930-aa07-f61a52ed48a0":"700 28px/normal 'Poppins New', sans-serif"},
        /* wwFront:end */
        browser: computed(() => {
            const router = wwLib.manager ? wwLib.getEditorRouter() : wwLib.getFrontRouter();
            const currentRoute = router.currentRoute.value;
            let currentQueries = currentRoute.query;
             return {
                url: window.location.origin + currentRoute.fullPath,
                path: currentRoute.path,
                // verify if auth plugin
                 /* wwFront:start */
                // eslint-disable-next-line no-dupe-keys
                source: currentQueries._source,
                /* wwFront:end */
                query: currentQueries,
                domain: window.location.hostname,
                baseUrl: window.location.origin,
                breakpoint: wwLib.$store.getters['front/getScreenSize'],
                environment: wwLib.getEnvironment(),
                theme: wwLib.$store.getters['front/getTheme'],
            };
        }),
        screen: services.scrollStore.screen,
        componentPositionInfo: services.scrollStore.componentPositionInfo,
    }),

    pageData: computed(() => {
        const lang = wwLib.$store.getters['front/getLang'];
        const cmsDataSetPath = wwLib.$store.getters['websiteData/getPage'].cmsDataSetPath;
        if (!cmsDataSetPath) {
            return { lang };
        }

        return { lang, data: wwLib.$store.getters['data/getPageCollectionData'] };
    }),

    getEnvironment() {
        return wwLib.manager
            ? 'editor'
            : window.location.host.includes(
                  // TODO: add staging2 ?
                  '-staging.' + (process.env.WW_ENV === 'staging' ? import.meta.env.VITE_APP_PREVIEW_URL : '')
              )
            ? 'staging'
            : window.location.host.includes(import.meta.env.VITE_APP_PREVIEW_URL)
            ? 'preview'
            : 'production';
    },

    useBaseTag() {
        return (
            wwLib.getEnvironment() === 'production' &&
            window.wwg_designInfo.baseTag &&
            window.wwg_designInfo.baseTag.href
        );
    },

    getBaseTag() {
        let baseTag = window.wwg_designInfo.baseTag?.href || '';
        if (!baseTag.startsWith('/')) {
            baseTag = '/' + baseTag;
        }
        if (!baseTag.endsWith('/')) {
            baseTag += '/';
        }
        return baseTag;
    },

    /**
     * @PUBLIC_API
     */
    getFrontWindow() {
        if (document.querySelector('.ww-manager-iframe')) {
            return document.querySelector('.ww-manager-iframe').contentWindow;
        }
        return window;
    },

    /**
     * @PUBLIC_API
     */
    getFrontDocument() {
        return this.getFrontWindow().document;
    },

    /**
     * @PUBLIC_API
     */
    getFrontRouter() {
        return this.front.router;
    },

    /**
     * @PUBLIC_API
     */
    getEditorWindow() {
         // eslint-disable-next-line no-unreachable
        return null;
    },

    /**
     * @PUBLIC_API
     */
    getEditorDocument() {
         // eslint-disable-next-line no-unreachable
        return null;
    },

    /**
     * @PUBLIC_API
     */
    getEditorRouter() {
        return this.editor.router;
    },

    /**
     * @PUBLIC_API
     * @DEPRECATED wwLib.wwApp.goTo
     */
    goTo(...args) {
        wwLib.wwLog.warn('wwLib.goTo is DEPRECATED, use wwLib.wwApp.goTo instead');
        wwLib.wwApp.goTo(...args);
    },

    /**
     * @PUBLIC_API
     * @DEPRECATED wwLib.wwUtils.getStyleFromToken
     */
    getStyleFromToken(...args) {
        // wwLib.wwLog.warn('wwLib.getStyleFromToken is DEPRECATED, use wwLib.wwUtils.getStyleFromToken instead');
        return wwLib.wwUtils.getStyleFromToken(...args);
    },

    /**
     * @PUBLIC_API
     * @DEPRECATED wwLib.wwUtils.getTypoFromToken
     */
    getTypoFromToken(...args) {
        // wwLib.wwLog.warn('wwLib.getTypoFromToken is DEPRECATED, use wwLib.wwUtils.getTypoFromToken instead');
        return wwLib.wwUtils.getTypoFromToken(...args);
    },

    /**
     * @PUBLIC_API
     * @DEPRECATED
     */
    element(value) {
        wwLib.wwLog.warn('wwLib.element is DEPRECATED');
        if (typeof value === 'object') {
            return { isWwObject: true, ...value };
        } else {
            return { isWwObject: true, type: value };
        }
    },

    /**
     * @PUBLIC_API
     * @DEPRECATED wwLib.wwUtils.resolveObjectPropertyPath
     */
    resolveObjectPropertyPath(...args) {
        // wwLib.wwLog.warn(
        //     'wwLib.resolveObjectPropertyPath is DEPRECATED, use wwLib.wwUtils.resolveObjectPropertyPath instead'
        // );
        return wwLib.wwUtils.resolveObjectPropertyPath(...args);
    },

    /**
     * @PUBLIC_API
     * @DEPRECATED wwLib.wwutils.getTextStyleFromContent
     */
    getTextStyleFromContent(...args) {
        // wwLib.wwLog.warn(
        //     'wwLib.getTextStyleFromContent is DEPRECATED, use wwLib.wwUtils.getTextStyleFromContent instead'
        // );
        return wwLib.wwUtils.getTextStyleFromContent(...args);
    },

    /**
     * @PUBLIC_API
     * @DEPRECATED wwLib.wwWorkflow.executeGlobal
     */
    async executeWorkflow(...args) {
        wwLib.wwLog.warn('wwLib.executeWorkflow is DEPRECATED, use wwLib.wwWorkflow.executeGlobal instead');
        return wwLib.wwWorkflow.executeGlobal(...args);
    },

    /**
     * @PUBLIC_API
     * @EDITOR
     * @DEPRECATED wwLib.wwEditor.findParentUidByFlag
     */
    findParentUidByFlag(...args) {
        wwLib.wwLog.warn('wwLib.wwEditor.findParentUidByFlag is DEPRECATED, use wwLib.findParentUidByFlag instead');
        return wwLib.wwEditor.findParentUidByFlag(...args);
    },

    /**
     * @PUBLIC_API
     * @EDITOR
     * @DEPRECATED wwLib.wwEditor.selectParentByFlag
     */
    selectParentByFlag(...args) {
        wwLib.wwLog.warn('wwLib.wwEditor.selectParentByFlag is DEPRECATED, use wwLib.selectParentByFlag instead');
        return wwLib.wwEditor.selectParentByFlag(...args);
    },

    /**
     * @PUBLIC_API
     * @DEPRECATED wwLib.wwElement.useCreate
     */
    useCreateElement() {
        wwLib.wwLog.warn('wwLib.useCreateElement is DEPRECATED, use wwLib.wwElement.useCreate instead');
        return this.wwElement.useCreate();
    },

    /**
     * @PUBLIC_API
     * @DEPRECATED wwLib.wwElement.useLayoutStyle
     */
    useLayoutStyle() {
        wwLib.wwLog.warn('wwLib.useLayoutStyle is DEPRECATED, use wwLib.wwElement.useLayoutStyle instead');
        return wwLib.wwElement.useLayoutStyle();
    },

    /**
     * @PUBLIC_API
     */
    useIcons() {
        const store = useIconsStore();
        return {
            getIcon: store.getIcon,
        };
    },
};

function pageSanitizer(page) {
    const keysToInclude = [
        'id',
        'name',
        'folder',
        'metaImage',
        'pageLoaded',
        'paths',
        'langs',
        'meta',
        'title',
        'sections',
        'pageUserGroups',
    ];

    const _page = {};
    keysToInclude.forEach(key => {
        _page[key] = page[key];
    });

    _page.meta && delete _page.meta.__typename;
    for (const section of _page.sections || []) {
        delete section.__typename;
    }

    const lang = wwLib.$store.getters['front/getLang'];
    if (_page.paths) _page.path = _page.paths[lang] || _page.paths.default;
    else _page.path = null;

    _page.lang = lang;

    return _page;
}
