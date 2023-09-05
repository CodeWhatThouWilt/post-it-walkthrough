/*

1. Create our migration / model files
    - Users:
        - username STRING
        - npx sequelize model:generate --name User --attributes username:string
    - Posts:
        - body STRING
        - npx sequelize model:generate --name Post --attributes body:string
        - New migration file:
            - userId INTEGER
            - npx sequelize migration:generate --name add-userId-to-post
    - Comments:
        - body STRING
        - userId INTEGER
        - postId INTEGER
    - Likes:
        - userId INTEGER
        - postId INTEGER
    - Groups:
        - name STRING
    - UserGroup:
        - userId INTEGER
        - groupId INTEGER
2. Test our UP and DOWN in migration files
    - UP:
        - npx dotenv sequelize db:migrate
    - DOWN:
        - npx dotenv sequelize db:migrate:undo:all
3. Create seeder files to insert data into our database
    - Users:
        - npx sequelize seed:generate --name user-seeders
    - Posts:
        - npx sequelize seed:generate --name post-seeders
4. Test seeders
    - UP
        - npx dotenv sequelize db:seed:all
    - DOWN
        - npx dotenv sequelize db:seed:undo:all



*/
