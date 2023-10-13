/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

  pgm.createTable('books', {
    isPublic: { type: 'boolean', default: false },
    id: {
      type: 'uuid',
      default: pgm.func('uuid_generate_v4()'),
      primaryKey: true,
    },
    type: { type: 'varchar(10)', notNull: true },
    title: { type: 'varchar(255)', notNull: true },
    year: { type: 'smallint' },
    country: { type: 'varchar(55)' },
    description: { type: 'varchar(1020)' },
    author: { type: 'varchar(55)[]' },
    language: { type: 'varchar(55)' },
    pages: { type: 'smallint' },
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
  pgm.createIndex('books', 'id');
  pgm.createIndex('books', 'year');
  pgm.createIndex('books', 'type');
  pgm.createIndex('books', 'isPublic');
  pgm.createIndex('books', ['createdAt', 'isChecked', 'isPublic']);
  pgm.sql(
    `CREATE INDEX "books_title_index" ON "books" USING GIN (to_tsvector('english', title))`,
  );
  pgm.sql(`CREATE INDEX "books_genres_index" ON "books" USING GIN(genres);`);
};
