module.exports = {
    desktop: {
        server: {
            pages: 'financing-desktop/financing-desktop-webapp/src/main/resources',
            static: 'financing-static',
            port: '80',
            livereload: '35729'
        },
        path: {
            src: {
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
            pages: 'financing-mobile/financing-mobile-webapp/src/main/webapp',
            static: 'financing-frontend-mobile-static/mobile',
            port: '80',
            livereload: '35729'
        },
        path: {
            src: {
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
