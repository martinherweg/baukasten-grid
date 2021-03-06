import browserSync from 'browser-sync';
import gulp from 'gulp';
import pkg from '../../package.json';

const browserSyncTask = () => {
    // Browser Sync Init
    browserSync.init({
        ghostMode: {
            clicks: true,
            forms: true,
            links: true,
            scroll: true,
        },
        logLevel: 'info', // info, debug, warn, silent
        watchTask: true,
        open: false, // false if you don't want to automatically open the browser
        stream: true,
        notify: {
            styles: [
                'padding: 20px 40px;',
                'font-family: arial;',
                'line-height: 1',
                'position: fixed;',
                'font-size: 16px;',
                'font-weight: bold',
                'z-index: 9999;',
                'top: inherit',
                'border-radius: 0',
                'right: 0;',
                'bottom: 0;',
                'color: #fff;',
                'background-color: rgba(255,0,0, .8)',
                'text-transform: uppercase',
            ],
        },
        files: [
            {
                match: [
                    `${pkg.dist.markup}**/*.{html,php,twig,rss}`,
                    `${pkg.dist.css}**/*.{css}`,
                ],
                fn(event, file) {
                    console.log(
                        `-> Event: ${event}: ${file}`,
                    );
                    if (event === 'change' && file.includes('.css')) {
                        browserSync.reload('*.css');
                    }
                    if (
                        (event === 'change' &&
                            (file.includes('.php') ||
                                file.includes('.html') ||
                                file.includes('.twig'))) ||
                        file.includes('.json')
                    ) {
                        browserSync.reload();
                    }
                },
            },
        ],
    });
};

gulp.task('browser-sync', browserSyncTask);

module.exports = browserSyncTask;
