/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createExtension('vector');
  pgm.sql('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

  pgm.createTable('userMedia', {
    id: {
      type: 'uuid',
      default: pgm.func('uuid_generate_v4()'),
      primaryKey: true,
    },
    role: { type: 'varchar(1)', notNull: true },
    name: { type: 'varchar(55)', notNull: true },
    email: { type: 'varchar(255)', unique: true, notNull: true },
    password: { type: 'varchar(72)', notNull: true },
    picture: { type: 'varchar(255)' },
    note: { type: 'varchar(1020)' },
    mediaTokens: { type: 'smallint', notNull: true, default: 100 },
    additionalMediaTokens: { type: 'smallint', notNull: true, default: 200 },
    activationLink: { type: 'varchar(255)' },
    resetPasswordLink: { type: 'varchar(255)' },
    isActivated: { type: 'boolean', default: false },
    banReason: { type: 'varchar(255)' },
    warnings: { type: 'varchar(255)[]' },
    isBanned: { type: 'boolean', default: false },
    canSendReport: { type: 'boolean', default: true },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });
  pgm.createIndex('users', 'email');
  pgm.createIndex('users', 'createdAt');
  pgm.createIndex('users', 'activationLink');

  pgm.createTable('userMedia', {
    userId: {
      type: 'uuid',
      notNull: true,
      references: '"users"',
      onDelete: 'cascade',
    },
    mediaType: { type: 'varchar(10)', notNull: true },
    mediaId: {
      type: 'uuid',
      notNull: true,
    },
    watched: { type: 'varchar(10)', notNull: true, default: 'plan' },
    rate: { type: 'smallint' },
    note: { type: 'varchar(1020)' },
    changed: { type: 'varchar(10)[]' },
    updatedAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });
  pgm.createIndex('userMedia', 'userId');
  pgm.createIndex('userMedia', ['userId', 'mediaId']);
  pgm.createIndex('userMedia', [
    'userId',
    'mediaType',
    'mediaId',
    'rate',
    'watched',
  ]);
  pgm.createIndex('userMedia', ['userId', 'mediaType', 'updatedAt']);

  pgm.createTable('notifications', {
    id: {
      type: 'uuid',
      default: pgm.func('uuid_generate_v4()'),
      primaryKey: true,
    },
    type: { type: 'varchar(10)', notNull: true, default: 'base' },
    userId: {
      type: 'uuid',
      notNull: true,
      references: '"users"',
      onDelete: 'cascade',
    },
    followerId: {
      type: 'uuid',
      references: '"users"',
      onDelete: 'cascade',
    },
    notification: { type: 'varchar(1020)' },
    isWatched: {
      type: 'boolean',
      default: false,
    },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });
  pgm.createIndex('notifications', ['userId', 'isWatched']);

  pgm.createTable('tokens', {
    token: { type: 'uuid', notNull: true },
    userId: {
      type: 'uuid',
      notNull: true,
      references: '"users"',
      onDelete: 'cascade',
    },
    uniqueId: { type: 'uuid', notNull: true },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });
  pgm.createIndex('tokens', 'token');
  pgm.createIndex('tokens', 'userId');
  pgm.createIndex('tokens', ['uniqueId', 'userId']);

  pgm.createTable('reports', {
    id: {
      type: 'uuid',
      default: pgm.func('uuid_generate_v4()'),
      primaryKey: true,
    },
    type: { type: 'varchar(10)', notNull: true },
    mediaType: { type: 'varchar(10)' },
    mediaId: {
      type: 'uuid',
    },
    userId: {
      type: 'uuid',
      references: '"users"',
      onDelete: 'cascade',
    },
    informerId: {
      type: 'uuid',
      notNull: true,
      references: '"users"',
      onDelete: 'cascade',
    },
    report: { type: 'varchar(510)' },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });
  pgm.createIndex('reports', 'type');
  pgm.createIndex('reports', 'createdAt');
  pgm.createIndex('reports', 'mediaType');

  pgm.createTable('follows', {
    userId: {
      type: 'uuid',
      notNull: true,
      references: '"users"',
      onDelete: 'cascade',
    },
    followId: {
      type: 'uuid',
      notNull: true,
      references: '"users"',
      onDelete: 'cascade',
    },
  });
  pgm.createIndex('follows', ['userId', 'followId']);
};
