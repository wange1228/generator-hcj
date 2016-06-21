module.exports = {
    desktop: {
        server: {
            pages: {
                path: 'financing-desktop/financing-desktop-webapp/src/main/resources',
                host: 'lc.vip.com'
            },
            static: {
                path: 'financing-static',
                host: 'lc.vipstatic.com'
            },
            port: '443',
            livereload: '35729'
        },
        path: {
            src: {
                base: 'financing-frontend-develop',
                pages: 'financing-frontend-develop/ftl',
                styles: 'financing-frontend-develop/style',
                scripts: 'financing-frontend-develop/js',
                images: 'financing-frontend-develop/images'
            },
            build: {
                pages: 'financing-desktop/financing-desktop-webapp/src/main/resources/ftl',
                styles: 'financing-static/style',
                scripts: 'financing-static/js',
                images: 'financing-static/images'
            }
        }
    },
    mobile: {
        server: {
            pages: {
                path: 'financing-mobile/financing-mobile-webapp/src/main/webapp',
                host: 'mlc.vip.com'
            },
            static: {
                path: 'financing-frontend-mobile-static',
                host: 'mlc.vipstatic.com'
            },
            port: '443',
            livereload: '35729'
        },
        path: {
            src: {
                base: 'financing-frontend-mobile-develop',
                pages: 'financing-frontend-mobile-develop/pages',
                styles: 'financing-frontend-mobile-develop/styles',
                scripts: 'financing-frontend-mobile-develop/scripts',
                images: 'financing-frontend-mobile-develop/images'
            },
            build: {
                pages: 'financing-mobile/financing-mobile-webapp/src/main/webapp/pages',
                styles: 'financing-frontend-mobile-static/mobile/styles',
                scripts: 'financing-frontend-mobile-static/mobile/scripts',
                images: 'financing-frontend-mobile-static/mobile/images'
            }
        }
    }
};
