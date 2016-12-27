function AppConfig() {
    this.id;
    this.connectionName;
    this.connectionUrl;
    this.isDefult;
    this.showOrder;
    this.init = (ac) => {
        this.id = ac.id;
        this.connectionName = ac.connectionName;
        this.connectionUrl = ac.connectionUrl;
        this.isDefult = ac.isDefult;
        this.showOrder = ac.showOrder;
    }
}

function AppSessions() {
    this.sessions = new Array();
    this.addSession = (appConfig) => {
        this.sessions[this.sessions.length - 1] = appConfig;
    }

    this.getSession = (index) => {

    }

    this.getDefaultSession = () => {

    }

    this.sortByShowOrder = (app1, app2) => {
        return app1.showOrder - app2.showOrder;
    }

    this.loadSessions = (sessionsFile) => {
        var fs = require('fs');

        fs.readFile(sessionsFile, function(error, data) {
            if (error) {
                console.log(error.code);
                console.log(error.errno);
                console.log(error.message);
                if (error.code === 'ENOENT') {
                    console.log('need to create new connection file');
                }
                let appConfig = new AppConfig();
                appConfig.id = 0;
                appConfig.connectionName = 'default connection';
                appConfig.connectionUrl = 'http://localhost/nr/api';
                appConfig.isDefult = true;
                appConfig.showOrder = 1;
                fs.writeFile(sessionsFile, JSON.stringify(appConfig), (error) => {})
                data = JSON.stringify(appConfig);
            }
            let jsonObjects = JSON.parse(data);
            for (let i = 0; i < jsonObjects.length; i++) {
                let ac = jsonObjects[i];
                let appConfig = new AppConfig();
                appConfig.init(ac);
                this.addSession(appConfig);
            }
            //this.sessions.sort(this.sortByShowOrder);
        });

    }

    this.saveSessions = (connectionFile) => {

    }

}

exports.AppSessions = AppSessions;
exports.AppConfig = AppConfig;