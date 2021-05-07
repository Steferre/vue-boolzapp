const app = new Vue({
    el: '#app',
    data: {
        userList: globalUsersList,
        activeUser: {},
        userNewMsg: "",
        timer: null,
        specificUser: ""
    },
    computed: {
        getActiveUserLastAccess() {
            if(!this.activeUser.messages) {
                return "";
            }

            let onlyReceivedMex = this.activeUser.messages.filter((msg) => msg.status === 'received');

            if(onlyReceivedMex.length === 0){
                return "";
            }

            let lastMexDate = onlyReceivedMex[onlyReceivedMex.length - 1].date;

            if(!lastMexDate) {
                return "";
            }

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
        createNewConversation() {
            let newMessage = {
                date: moment().format("DD-MM-YYYY HH:mm:ss"),
                text: this.userNewMsg,
                status: 'sent',
                activePopup: false
            };

            const currentUser = this.activeUser;

            currentUser.messages.push(newMessage);
 
            this.userNewMsg = "";

            this.scrollToBottom();

            setTimeout(() => {
                let newAnswer = {
                    date: moment().format("DD-MM-YYYY HH:mm:ss"),
                    text: "Ok",
                    status: 'received',
                    activePopup: false   
                };

                currentUser.messages.push(newAnswer);

                this.scrollToBottom();
            }, 1000);
        },
        searchSpecificUser() {
            return this.userList.filter((searchedUser) => searchedUser.name.toLowerCase().includes(this.specificUser.toLowerCase()));
        },
        scrollToBottom() {
            this.$nextTick(() => {
                const htmlElement = this.$refs.chatContainerToScroll

                htmlElement.scrollTop = htmlElement.scrollHeight
            });
        },
        popupActivated(index) {
         
            const selectedMsg = this.activeUser.messages[index];

            selectedMsg.activePopup = !selectedMsg.activePopup;
           
        },
        deleteMessage(index) {
            let currentChatMessages = this.activeUser.messages;

            currentChatMessages.splice(index, 1);
        },
        getLastMessage(index) {
            const singleUserMsgList = this.userList[index].messages;

            if(singleUserMsgList.length === 0) {
                return "Non ci sono messaggi"
            }

            const lastMsg = singleUserMsgList[singleUserMsgList.length - 1];

            return lastMsg.text;
        },
        getLastAccessHour(index) {
            const singleUserMsgList = this.userList[index].messages;
            if(singleUserMsgList.length === 0) {
                return ""
            }

            const lastMsgHour = singleUserMsgList[singleUserMsgList.length - 1];

            return this.getFormatDate(lastMsgHour.date);

        }
    },
    mounted() {
        this.activeUser = this.userList[0];
    }
})