import { Express } from 'express';
import signupRouter from './api/signup';
// import usersDevicesRouter from './api/usersDevices';
// import circleRouter from './api/circle';
// import approvalNotificationRouter from './api/approvalNotification';
// import rejectedUsersRouter from './api/rejectedUsers';

export const routes = (app: Express): void => {
  app.use('/api/user', signupRouter);
  // app.use('/api/UserDevice', usersDevicesRouter);
  // app.use('/api/circle', circleRouter);
  // app.use('/api/approvalNotification', approvalNotificationRouter);
  // app.use('/api/rejectedUsers', rejectedUsersRouter);
};
