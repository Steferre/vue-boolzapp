const app = new Vue({
    el: '#app',
    data: {
        userList: globalUsersList,
        activeUser: {},
    },
    computed: {
        getActiveUserLastAccess() {
            if(!this.activeUser.messages) {
                return "";
            }

            let onlyReceivedMex = this.activeUser.messages.filter((msg) => msg.status === 'received');

            let lastMexDate = onlyReceivedMex[onlyReceivedMex.length - 1].date;

            return this.getFormatDate(lastMexDate);
        }
    },
    methods: {
        getUserImgPath(user) {
            return `img/avatar${user.avatar}.jpg`;
        },
        getActiveUser(selectedUser) {
            return this.activeUser = selectedUser;
        },
        getFormatDate(date) {
            return moment(date, "DD-MM-YYYY HH:mm:ss").format("HH:mm");
        },
    },
    mounted() {
        this.activeUser = this.userList[0]
    }


})