/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

  pgm.createTable('comics', {
    isPublic: { type: 'boolean', default: false },
    id: {
      type: 'uuid',
      default: pgm.func('uuid_generate_v4()'),
      primaryKey: true,
    },
    type: { type: 'varchar(10)', notNull: true },
    title: { type: 'varchar(255)', notNull: true },
    startYear: { type: 'smallint' },
    endYear: { type: 'smallint' },
    country: { type: 'varchar(55)' },
    description: { type: 'varchar(1020)' },
    author: { type: 'varchar(55)[]' },
    language: { type: 'varchar(55)' },
    volumes: { type: 'smallint' },
    genres: { type: 'varchar(55)[]' },
    tags: { type: 'varchar(55)[]' },
    image: { type: 'varchar(255)' },
    embedding: { type: 'vector(1536)' },
    moderId: {
      type: 'uuid',
      references: '"users"',
    },
    creatorId: {
      type: 'uuid',
      notNull: true,
      references: '"users"',
    },
    report: { type: 'varchar(1020)' },
    isChecked: { type: 'boolean', default: false },
    createdType: { type: 'varchar(55)', notNull: true },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });
  pgm.createIndex('comics', 'id');
  pgm.createIndex('comics', 'startYear');
  pgm.createIndex('comics', 'type');
  pgm.createIndex('comics', 'isPublic');
  pgm.createIndex('comics', ['createdAt', 'isChecked', 'isPublic']);
  pgm.sql(
    `CREATE INDEX "comics_title_index" ON "comics" USING GIN (to_tsvector('english', title))`,
  );
  pgm.sql(`CREATE INDEX "comics_genres_index" ON "comics" USING GIN(genres);`);
};
