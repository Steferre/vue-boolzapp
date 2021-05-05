const app = new Vue({
    el: '#app',
    data: {
        userList: globalUsersList,
        activeUser: {},
        userNewMsg: "",
        timer: null,
    },
    computed: {
        getActiveUserLastAccess() {
            if(!this.activeUser.messages) {
                return "";
            }

            let onlyReceivedMex = this.activeUser.messages.filter((msg) => msg.status === 'received');

            let lastMexDate = onlyReceivedMex[onlyReceivedMex.length - 1].date;

            return this.getFormatDate(lastMexDate);
        },
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
        createNewMsg() {
            let newMessagesList = this.activeUser.messages.push({
                date: moment(),
                text: this.userNewMsg,
                status: 'sent'
            });
 
             this.userNewMsg = "";
 
             return newMessagesList;
        },
        createNewAnswer() {
            let newMessagesList = this.activeUser.messages.push({
                date: moment(),
                text: 'Ok!',
                status: 'received'
            });

             return newMessagesList;
        },
        autoAnswer() {
            return this.timer = setTimeout(this.createNewAnswer, 1000);
        },
    },
    mounted() {
        this.activeUser = this.userList[0]
    }


})