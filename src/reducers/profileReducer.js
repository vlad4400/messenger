import update from 'react-addons-update';

const initialStore = {
    profile: {
        isChatLoading: true,
        userName: 'My Name',
        userStatus: 'Status',
        urlAvatar: '#',
        card: {
            1: {
                title: 'Name photo',
                subtitle: 'more info about photo',
                src: '#'
            }
        },
        aboutTitle: 'About me',
        aboutText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' +
            '\nDonec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.' +
            '\nDonec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.' +
            '\nAliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.'
    },
};

export default function profileReducer(store = initialStore, action) {
    switch (action.type) {
        default:
            return store;
    }
}