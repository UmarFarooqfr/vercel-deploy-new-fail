export const routes = function (app: any): void {
    app.use('/api/user', require('./api/signup'));
    app.use('/api/UserDevice', require('./api/usersDevices'));
    app.use('/api/circle', require('./api/circle'));
    app.use('/api/approvalNotification', require('./api/approvalNotification'));
    app.use('/api/rejectedUsers', require('./api/rejectedUsers'))
  }