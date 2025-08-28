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
            return theme === 'dark' ? {"33ed7606-bd82-4402-99cd-462db3704165":"#D7092F","fb9b4457-3204-481e-be55-135bc1a82068":"#FFFFFF00","b56de429-ffbe-4d51-b1de-ad6369f4a4a6":"#2afc85","0172ae29-ac28-49da-a4e6-d24c0d40a8ef":"#F2F2F2","da5e496e-7e7f-48b3-9213-34b2ba0a2245":"#0def6a","1d1f94c7-f499-4c4f-a91f-00e4074a5fab":"#08A74E","c2008444-37f7-4048-8e1f-e503169fbd08":"#F2F2F2","93b0e899-5c32-4a4e-aae6-6ec6f0d7849c":"#E6E6E6","a6525206-70d4-45dc-be2b-62853d4e7473":"#E8E8E8","9430c7af-cde9-4355-8c66-9a1c48d84f5f":"#FBECC5","c4fe0222-a3de-4c92-931d-cdaa0ed4246b":"#FBD0D8","570b93a1-1260-439a-8592-a989e96ee804":"#FFFFFF","31438c66-57ba-4b5e-95ea-5d231d5631c3":"#000000","d8449492-bbe9-4985-9e61-6b430c1efbfa":"#FFFFFF","522e3ac5-5adb-400e-87c0-fca5e1832533":"#FFFFFF","c057d906-4b26-446a-9b0e-d02131245c05":"#121212","73f234fe-0c07-482e-bb0e-b37e042968b4":"#FFFFFF4D","2052a221-63d8-4c72-9451-ca78e6e4b7a4":"#787878","0a57aa73-76b3-4900-97c7-e47d8b7e1dd4":"#0A0A0A","4a162102-e766-4c7d-97f2-5c9c2f3fe294":"#54545459","2f1457f8-2433-4c8c-a29d-a70a0c4d2e30":"#00000026","23ba2384-b918-483a-936e-25e07b010e44":"#E8E8E8","56769d11-4a41-44e4-a006-74d11aa846ec":"#EDEDED","9497cbd4-a7b9-41f1-9bad-67fe68f9d326":"#2B2B2B","c1ab9f23-47ec-42e9-8b02-6f41daaa51c4":"#F4D80B","0524d68a-4da4-4233-9a12-7000beb2a4c7":"#575757","c81de80d-912a-450a-8623-1cfedcab2de6":"#0A0D120D","d9ff96c0-d431-45e6-b687-838af0013bb4":"#363535","16a48224-b5c1-4ef2-902f-4d7a769a1959":"#824cf6","57aa6962-0391-4060-96bd-f93ff3c34d5a":"#F2F2F2","d3ae6b52-c77f-4f16-bd1b-4f93cedaee0b":"#1f97f4","e427ff3d-5122-4e81-8055-8b423f04d103":"#0A0D120D","d7a74484-ed01-4b39-9de5-092cf6ad999a":"#0A0D121A","9b362a7b-bd58-4a7a-b381-d17ab4797134":"#0DEF6A4D","395bf08a-b379-4635-b8b2-9f116ef799f4":"#FAFAFA","78570b2e-c07e-4cdc-835f-8e23893af43c":"#A4A7AE","ec1408b4-3d31-49e6-841c-19ff1bf9fec4":"#414651","47a5fe02-aa8c-46e1-b96c-40a872ae5d2d":"#0A0D1214"} : {"33ed7606-bd82-4402-99cd-462db3704165":"#D92D20","fb9b4457-3204-481e-be55-135bc1a82068":"#FFFFFF00","b56de429-ffbe-4d51-b1de-ad6369f4a4a6":"#2afc85","0172ae29-ac28-49da-a4e6-d24c0d40a8ef":"#F2F2F2","da5e496e-7e7f-48b3-9213-34b2ba0a2245":"#0def6a","1d1f94c7-f499-4c4f-a91f-00e4074a5fab":"#08A74E","c2008444-37f7-4048-8e1f-e503169fbd08":"#F2F2F2","93b0e899-5c32-4a4e-aae6-6ec6f0d7849c":"#E6E6E6","a6525206-70d4-45dc-be2b-62853d4e7473":"#E8E8E8","9430c7af-cde9-4355-8c66-9a1c48d84f5f":"#FBECC5","c4fe0222-a3de-4c92-931d-cdaa0ed4246b":"#FBD0D8","570b93a1-1260-439a-8592-a989e96ee804":"#12142D","31438c66-57ba-4b5e-95ea-5d231d5631c3":"#F6F6F6","d8449492-bbe9-4985-9e61-6b430c1efbfa":"#000000","522e3ac5-5adb-400e-87c0-fca5e1832533":"#12142DF2","c057d906-4b26-446a-9b0e-d02131245c05":"#FFFFFF","73f234fe-0c07-482e-bb0e-b37e042968b4":"#12142D4D","2052a221-63d8-4c72-9451-ca78e6e4b7a4":"#787878","0a57aa73-76b3-4900-97c7-e47d8b7e1dd4":"#fafafa","4a162102-e766-4c7d-97f2-5c9c2f3fe294":"#00000066","2f1457f8-2433-4c8c-a29d-a70a0c4d2e30":"#00000026","23ba2384-b918-483a-936e-25e07b010e44":"#E8E8E8","56769d11-4a41-44e4-a006-74d11aa846ec":"#EDEDED","9497cbd4-a7b9-41f1-9bad-67fe68f9d326":"#f2f2f2","c1ab9f23-47ec-42e9-8b02-6f41daaa51c4":"#F4D80B","0524d68a-4da4-4233-9a12-7000beb2a4c7":"#e5e5e5","c81de80d-912a-450a-8623-1cfedcab2de6":"#0A0D120D","d9ff96c0-d431-45e6-b687-838af0013bb4":"#DDDDDF","16a48224-b5c1-4ef2-902f-4d7a769a1959":"#824cf6","57aa6962-0391-4060-96bd-f93ff3c34d5a":"#F2F2F2","d3ae6b52-c77f-4f16-bd1b-4f93cedaee0b":"#1f97f4","e427ff3d-5122-4e81-8055-8b423f04d103":"#0A0D120D","d7a74484-ed01-4b39-9de5-092cf6ad999a":"#0A0D121A","9b362a7b-bd58-4a7a-b381-d17ab4797134":"#0DEF6A4D","395bf08a-b379-4635-b8b2-9f116ef799f4":"#FAFAFA","78570b2e-c07e-4cdc-835f-8e23893af43c":"#A4A7AE","ec1408b4-3d31-49e6-841c-19ff1bf9fec4":"#414651","47a5fe02-aa8c-46e1-b96c-40a872ae5d2d":"#0A0D1214"};
            /* wwFront:end */
        }),
        spacings:
         /* wwFront:start */
        // eslint-disable-next-line no-unreachable, no-undef
        {"40686087-d86d-4d00-965a-7c44bd58bc76":"8px","81a5cb9a-9216-463e-a436-8b9d92de45f3":"12px","5e604227-96d8-4f2b-aa09-1a54c28897f3":"16px","36acbe25-75dc-4ed9-9df6-987d81ffbf31":"2px","457b6334-a06f-4a07-9001-95eed5c50a75":"24px","5d2ff1f0-d80c-4265-90f0-3054fe4da525":"10px","c6bf25b9-d895-4601-bddd-8614ac4b0461":"8px","b29162e5-5d85-4ac4-b765-4436038247ae":"6px"},
        /* wwFront:end */
        typographies:
         /* wwFront:start */
        // eslint-disable-next-line no-unreachable, no-undef
        {"1a8ce8c2-dc77-40f2-94fa-4fc105cc3083":"400 26px/normal var(--ww-default-font-family, sans-serif)","a46fa35e-3e74-427b-b8e6-475d60436fe0":"400 26px/normal var(--ww-default-font-family, sans-serif)","7656df4d-18d2-44ba-93c1-f9c9a1328ed7":"400 20px/normal var(--ww-default-font-family, sans-serif)","6239190d-f1c7-4571-8b0a-e66f5c044fba":"600 10px/normal var(--ww-default-font-family, sans-serif)","634fb572-093a-45bb-8c45-fc6cb4ccea26":"400 15px/110% var(--ww-default-font-family, sans-serif)","0171c0b0-f20c-4be4-a105-146fba01ea1b":"500 14px/normal 'Poppins New', sans-serif","f399f55d-0bd0-4918-b982-832f76c09144":"700 14px/normal var(--ww-default-font-family, sans-serif)","a542b785-c5a1-4179-90e1-b6d216295569":"700 20px/normal var(--ww-default-font-family, sans-serif)","22296b77-5b46-433b-99ad-3f39f6098bbc":"400 14px/normal 'Poppins', sans-serif","f7442b07-b24a-46d6-bb00-c0ab30a30507":"700 40px/normal 'Poppins New', sans-serif","73b2654b-2db2-4f51-a1a8-3d075ba01d0d":"700 28px/normal 'Poppins New', sans-serif"},
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
