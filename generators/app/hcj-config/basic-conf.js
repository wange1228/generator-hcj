var path = require('path');

var cfg = {
    desktop: {
        devRoot: 'financing-frontend-develop',
        distRoot: 'financing-static',
        serverRoot: 'financing-desktop',
        host: {
            server: 'lc.vip.com',
            statics: 'lc.vipstatic.com'
        }
    },
    mobile: {
        devRoot: 'financing-frontend-mobile-develop',
        serverRoot: 'financing-mobile',
        distRoot: 'financing-frontend-mobile-static',
        host: {
            server: 'mlc.vip.com',
            statics: 'mlc.vipstatic.com'
        }
    },
    statics: 'financing-static'
}

module.exports = {
    basic: cfg,
    desktop: {
        server: {
            pages: {
                path: path.join(cfg.desktop.serverRoot, 'financing-desktop-webapp/src/main/resources'), //pagesSvrPath
                host: cfg.desktop.host.server
            },
            statics: {
                path: cfg.statics,
                host: cfg.desktop.host.statics
            },
            port: '443',
            livereload: '35729'
        },
        path: {
            src: {
                pages: path.join(cfg.desktop.devRoot, 'ftl'),
                styles: path.join(cfg.desktop.devRoot, 'style'),
                scripts: path.join(cfg.desktop.devRoot, 'js'),
                images: path.join(cfg.desktop.devRoot, 'images')
            },
            build: {
                pages: path.join(cfg.desktop.serverRoot, 'financing-desktop-webapp/src/main/resources/ftl'),
                styles: path.join(cfg.desktop.distRoot, 'styles'),
                scripts: path.join(cfg.desktop.distRoot, 'scripts'),
                images: path.join(cfg.desktop.distRoot, 'images'),
            }
        }
    },
    mobile: {
        server: {
            pages: {
                path: path.join(cfg.mobile.serverRoot, 'financing-mobile-webapp/src/main/webapp'),
                host: cfg.mobile.host.server
            },
            statics: {
                path: cfg.statics,
                host: cfg.mobile.host.statics
            },
            port: '443',
            livereload: '35729'
        },
        path: {
            src: {
                pages: path.join(cfg.mobile.devRoot, 'pages'),
                styles: path.join(cfg.mobile.devRoot, 'styles'),
                scripts: path.join(cfg.mobile.devRoot, 'scripts'),
                images: path.join(cfg.mobile.devRoot, 'images')
            },
            build: {
                pages: path.join(cfg.mobile.serverRoot, 'financing-mobile-webapp/src/main/webapp/pages'),
                styles: path.join(cfg.mobile.distRoot, 'styles'),
                scripts: path.join(cfg.mobile.distRoot, 'scripts'),
                images: path.join(cfg.mobile.distRoot, 'images'),
            }
        }
    }
    
}