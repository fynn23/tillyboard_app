import { createRouter, createWebHistory } from 'vue-router';

import wwPage from './views/wwPage.vue';

import { initializeData, initializePlugins, onPageUnload } from '@/_common/helpers/data';

let router;
const routes = [];

function scrollBehavior(to) {
    if (to.hash) {
        return {
            el: to.hash,
            behavior: 'smooth',
        };
    } else {
        return { top: 0 };
    }
}

 
/* wwFront:start */
import pluginsSettings from '../../plugins-settings.json';

// eslint-disable-next-line no-undef
window.wwg_designInfo = {"id":"bb46d291-a9a5-4c1e-b599-d4950d3d7c31","homePageId":"80561127-143e-4295-baad-6c0e7ab84231","authPluginId":"1fa0dd68-5069-436c-9a7d-3b54c340f1fa","baseTag":null,"defaultTheme":"light","langs":[{"lang":"en","default":true}],"background":{},"workflows":[],"pages":[{"id":"fc281129-cd99-4d59-821a-8ccddb7ccca4","linkId":"fc281129-cd99-4d59-821a-8ccddb7ccca4","name":"vcard","folder":null,"paths":{"en":"vcard","default":"vcard"},"langs":["en"],"cmsDataSetPath":null,"sections":[{"uid":"85c16d95-fb99-4b9b-99c3-59cd89018e3e","sectionTitle":"Login Container","linkId":"0af64fd2-a5e4-4391-b495-d10246842c63"}],"pageUserGroups":[],"title":{},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":""},{"id":"6498deef-88ed-4631-aeb4-67434de7a1e7","linkId":"6498deef-88ed-4631-aeb4-67434de7a1e7","name":"qr code","folder":null,"paths":{"en":"qr-code","default":"qr-code"},"langs":["en"],"cmsDataSetPath":null,"sections":[{"uid":"daaee29c-3ba8-484c-9808-5c922b9b0748","sectionTitle":"Section","linkId":"afd59983-80de-4dcf-81b6-8ca79ad36cd7"}],"pageUserGroups":[],"title":{},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":""},{"id":"9fd8f255-534e-4ef0-8462-71206c90e823","linkId":"9fd8f255-534e-4ef0-8462-71206c90e823","name":"Home","folder":null,"paths":{"en":"home","default":"home"},"langs":["en"],"cmsDataSetPath":null,"sections":[{"uid":"e1b3bc1d-c705-4b59-8fdc-13190ff7a6ed","sectionTitle":"Blank","linkId":"13aed0ac-783d-48db-9244-75abb16d9f8f"}],"pageUserGroups":[],"title":{"en":"","fr":"Vide | Commencer à partir de zéro"},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":""},{"id":"80561127-143e-4295-baad-6c0e7ab84231","linkId":"80561127-143e-4295-baad-6c0e7ab84231","name":"vimeo","folder":null,"paths":{"en":"vimeo","default":"vimeo"},"langs":["en"],"cmsDataSetPath":null,"sections":[{"uid":"26ae2f6d-b59b-45df-830d-f48cbfe5742c","sectionTitle":"Root Container","linkId":"caec004f-7edc-4634-a49b-a6195b0a99e8"}],"pageUserGroups":[],"title":{},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":""},{"id":"910d59d3-57ba-4bf4-89ef-7fed4563b39f","linkId":"910d59d3-57ba-4bf4-89ef-7fed4563b39f","name":"task","folder":null,"paths":{"en":"task","default":"task"},"langs":["en"],"cmsDataSetPath":null,"sections":[{"uid":"9e829e88-900c-41f4-b285-ee9cf65174b5","sectionTitle":"Skeleton Loader Section","linkId":"13d84540-0def-4f9b-aa16-7307a09daff5"}],"pageUserGroups":[],"title":{},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":""},{"id":"d53f5206-c31c-4ae6-a58c-7ab42fc1e311","linkId":"d53f5206-c31c-4ae6-a58c-7ab42fc1e311","name":"smilys","folder":null,"paths":{"en":"smilys","default":"smilys"},"langs":["en"],"cmsDataSetPath":null,"sections":[{"uid":"fe092a57-7a17-4480-8777-165be8677c52","sectionTitle":"Section","linkId":"b32f3a95-9421-419f-8ff8-6f90f1cf1427"}],"pageUserGroups":[],"title":{},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":""},{"id":"16fcb268-b11e-4533-b79f-5bbd16dcaf26","linkId":"16fcb268-b11e-4533-b79f-5bbd16dcaf26","name":"test","folder":null,"paths":{"en":"test","default":"test"},"langs":["en"],"cmsDataSetPath":null,"sections":[{"uid":"fa4a726e-3d9e-4c51-a837-ac1156ecd583","sectionTitle":"Section","linkId":"0a863eda-2dd3-4b7d-b1de-f97a1b50d128"}],"pageUserGroups":[],"title":{},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":""},{"id":"5d12ae1d-908a-4081-b7f2-08245b9f491b","linkId":"5d12ae1d-908a-4081-b7f2-08245b9f491b","name":"00","folder":null,"paths":{"en":"00","default":"00"},"langs":["en"],"cmsDataSetPath":null,"sections":[{"uid":"d5fc7c0f-b075-4898-8fdc-ab51a37c6450","sectionTitle":"Section","linkId":"2a5d5a24-035c-43de-a647-5904c9fa8ba0"}],"pageUserGroups":[],"title":{},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":""}],"plugins":[{"id":"f9ef41c3-1c53-4857-855b-f2f6a40b7186","name":"Supabase","namespace":"supabase"},{"id":"1fa0dd68-5069-436c-9a7d-3b54c340f1fa","name":"Supabase Auth","namespace":"supabaseAuth"},{"id":"69d4a5bb-09a3-4f3d-a94e-667c21c057eb","name":"NPM","namespace":"npm"}]};
// eslint-disable-next-line no-undef
window.wwg_cacheVersion = 37;
// eslint-disable-next-line no-undef
window.wwg_pluginsSettings = pluginsSettings;
// eslint-disable-next-line no-undef
window.wwg_disableManifest = false;

const defaultLang = window.wwg_designInfo.langs.find(({ default: isDefault }) => isDefault) || {};

const registerRoute = (page, lang, forcedPath) => {
    const langSlug = !lang.default || lang.isDefaultPath ? `/${lang.lang}` : '';
    let path =
        forcedPath ||
        (page.id === window.wwg_designInfo.homePageId ? '/' : `/${page.paths[lang.lang] || page.paths.default}`);

    //Replace params
    path = path.replace(/{{([\w]+)\|([^/]+)?}}/g, ':$1');

    routes.push({
        path: langSlug + path,
        component: wwPage,
        name: `page-${page.id}-${lang.lang}`,
        meta: {
            pageId: page.id,
            lang,
            isPrivate: !!page.pageUserGroups?.length,
        },
        async beforeEnter(to, from) {
            if (to.name === from.name) return;
            //Set page lang
            wwLib.wwLang.defaultLang = defaultLang.lang;
            wwLib.$store.dispatch('front/setLang', lang.lang);

            //Init plugins
            await initializePlugins();

            //Check if private page
            if (page.pageUserGroups?.length) {
                // cancel navigation if no plugin
                if (!wwLib.wwAuth.plugin) {
                    return false;
                }

                await wwLib.wwAuth.init();

                // Redirect to not sign in page if not logged
                if (!wwLib.wwAuth.getIsAuthenticated()) {
                    window.location.href = `${wwLib.wwPageHelper.getPagePath(
                        wwLib.wwAuth.getUnauthenticatedPageId()
                    )}?_source=${to.path}`;

                    return null;
                }

                //Check roles are required
                if (
                    page.pageUserGroups.length > 1 &&
                    !wwLib.wwAuth.matchUserGroups(page.pageUserGroups.map(({ userGroup }) => userGroup))
                ) {
                    window.location.href = `${wwLib.wwPageHelper.getPagePath(
                        wwLib.wwAuth.getUnauthorizedPageId()
                    )}?_source=${to.path}`;

                    return null;
                }
            }

            try {
                await import(`@/pages/${page.id.split('_')[0]}.js`);
                await wwLib.wwWebsiteData.fetchPage(page.id);

                //Scroll to section or on top after page change
                if (to.hash) {
                    const targetElement = document.getElementById(to.hash.replace('#', ''));
                    if (targetElement) targetElement.scrollIntoView();
                } else {
                    document.body.scrollTop = document.documentElement.scrollTop = 0;
                }

                return;
            } catch (err) {
                wwLib.$store.dispatch('front/showPageLoadProgress', false);

                if (err.redirectUrl) {
                    return { path: err.redirectUrl || '404' };
                } else {
                    //Any other error: go to target page using window.location
                    window.location = to.fullPath;
                }
            }
        },
    });
};

for (const page of window.wwg_designInfo.pages) {
    for (const lang of window.wwg_designInfo.langs) {
        if (!page.langs.includes(lang.lang)) continue;
        registerRoute(page, lang);
    }
}

const page404 = window.wwg_designInfo.pages.find(page => page.paths.default === '404');
if (page404) {
    for (const lang of window.wwg_designInfo.langs) {
        // Create routes /:lang/:pathMatch(.*)* etc for all langs of the 404 page
        if (!page404.langs.includes(lang.lang)) continue;
        registerRoute(
            page404,
            {
                default: false,
                lang: lang.lang,
            },
            '/:pathMatch(.*)*'
        );
    }
    // Create route /:pathMatch(.*)* using default project lang
    registerRoute(page404, { default: true, isDefaultPath: false, lang: defaultLang.lang }, '/:pathMatch(.*)*');
} else {
    routes.push({
        path: '/:pathMatch(.*)*',
        async beforeEnter() {
            window.location.href = '/404';
        },
    });
}

let routerOptions = {};

const isProd =
    !window.location.host.includes(
        // TODO: add staging2 ?
        '-staging.' + (process.env.WW_ENV === 'staging' ? import.meta.env.VITE_APP_PREVIEW_URL : '')
    ) && !window.location.host.includes(import.meta.env.VITE_APP_PREVIEW_URL);

if (isProd && window.wwg_designInfo.baseTag?.href) {
    let baseTag = window.wwg_designInfo.baseTag.href;
    if (!baseTag.startsWith('/')) {
        baseTag = '/' + baseTag;
    }
    if (!baseTag.endsWith('/')) {
        baseTag += '/';
    }

    routerOptions = {
        base: baseTag,
        history: createWebHistory(baseTag),
        routes,
    };
} else {
    routerOptions = {
        history: createWebHistory(),
        routes,
    };
}

router = createRouter({
    ...routerOptions,
    scrollBehavior,
});

//Trigger on page unload
let isFirstNavigation = true;
router.beforeEach(async (to, from) => {
    if (to.name === from.name) return;
    if (!isFirstNavigation) await onPageUnload();
    isFirstNavigation = false;
    wwLib.globalVariables._navigationId++;
    return;
});

//Init page
router.afterEach((to, from, failure) => {
    wwLib.$store.dispatch('front/showPageLoadProgress', false);
    let fromPath = from.path;
    let toPath = to.path;
    if (!fromPath.endsWith('/')) fromPath = fromPath + '/';
    if (!toPath.endsWith('/')) toPath = toPath + '/';
    if (failure || (from.name && toPath === fromPath)) return;
    initializeData(to);
});
/* wwFront:end */

export default router;
