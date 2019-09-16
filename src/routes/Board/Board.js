const React = require('react');
const classnames = require('classnames');
const { MainNavBar, MetaRow, MetaRowPlaceholder, placeholderStyles } = require('stremio/common');
const useCatalogs = require('./useCatalogs');
const styles = require('./styles');

const CONTINUE_WATCHING_MENU = [
    {
        label: 'Play',
        type: 'play'
    },
    {
        label: 'Dismiss',
        type: 'dismiss'
    }
];

const Board = () => {
    const catalogs = useCatalogs();
    return (
        <div className={styles['board-container']}>
            <MainNavBar className={styles['nav-bar']} />
            <div className={styles['board-content']}>
                {catalogs.map(({ req, content }, index) => {
                    switch (content.type) {
                        case 'Ready':
                            return (
                                <MetaRow
                                    key={`${index}${req.base}${content.type}`}
                                    className={styles['board-row']}
                                    title={`${req.path.id} - ${req.path.type_name}`}
                                    items={content.content}
                                />
                            );
                        case 'Message':
                            return (
                                <MetaRow
                                    key={`${index}${req.base}${content.type}`}
                                    className={styles['board-row']}
                                    title={`${req.path.id} - ${req.path.type_name}`}
                                    message={content.content}
                                />
                            );
                        case 'Loading':
                            return (
                                <MetaRowPlaceholder
                                    key={`${index}${req.base}${content.type}`}
                                    className={classnames(styles['board-row-placeholder'], placeholderStyles['placeholder-container'])}
                                />
                            );
                    }
                })}
            </div>
        </div>
    );
};

module.exports = Board;
