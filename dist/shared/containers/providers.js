"use strict";

var _tsyringe = require("tsyringe");

var _queue = require("../../config/queue");

var _BCryptProvider = require("../providers/hashProvider/implementations/BCryptProvider");

var _BullQueueProvider = require("../providers/queueProvider/implementations/BullQueueProvider");

var _HandlebarsProvider = require("../providers/templateProvider/implementations/HandlebarsProvider");

var _JsonWebTokenProvider = require("../providers/tokenProvider/implementations/JsonWebTokenProvider");

var _DateFnsProvider = require("../providers/dateProvider/implementations/DateFnsProvider");

var _SlugifyProvider = require("../providers/slugProvider/implementations/SlugifyProvider");

var _SharpProvider = require("../providers/processImageProvider/implementations/SharpProvider");

var _CloudinaryStorageProvider = require("../providers/storageProvider/implementations/CloudinaryStorageProvider");

var _SendGridMailProvider = require("../providers/mailProvider/implementations/SendGridMailProvider");

_tsyringe.container.registerSingleton('HashProvider', _BCryptProvider.BCryptProvider);

_tsyringe.container.registerSingleton('TokenProvider', _JsonWebTokenProvider.JsonWebTokenProvider);

_tsyringe.container.registerSingleton('MailProvider', _SendGridMailProvider.SendGridMailProvider);

_tsyringe.container.registerSingleton('TemplateProvider', _HandlebarsProvider.HandlebarsProvider);

_tsyringe.container.registerSingleton('DateProvider', _DateFnsProvider.DateFnsProvider);

_tsyringe.container.registerSingleton('SlugProvider', _SlugifyProvider.SlugifyProvider);

_tsyringe.container.registerSingleton('StorageProvider', _CloudinaryStorageProvider.CloudinaryStorageProvider);

_tsyringe.container.registerSingleton('ProcessImageProvider', _SharpProvider.SharpProvider);

_tsyringe.container.registerInstance('MailQueueProvider', new _BullQueueProvider.BullQueueProvider('mail-queue', _queue.queueConfig.mailQueue));

_tsyringe.container.registerInstance('StorageQueueProvider', new _BullQueueProvider.BullQueueProvider('storage-queue', _queue.queueConfig.storageQueue));