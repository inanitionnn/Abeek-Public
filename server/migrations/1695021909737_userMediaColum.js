/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.addColumns('userMedia', {
    id: {
      type: 'uuid',
      default: pgm.func('uuid_generate_v4()'),
      primaryKey: true,
    },
  });

  pgm.addColumns('follows', {
    id: {
      type: 'uuid',
      default: pgm.func('uuid_generate_v4()'),
      primaryKey: true,
    },
  });

  pgm.addColumns('tokens', {
    id: {
      type: 'uuid',
      default: pgm.func('uuid_generate_v4()'),
      primaryKey: true,
    },
  });
};
