# SETUP

Cara setup project AHP SHOE PRIORITY

## PRASYARAT

* Sudah menginstall NodeJS ( [Link Download](https://nodejs.org/en) )
* Sudah menginstall XAMPP / Laragon ( [XAMPP](https://www.apachefriends.org/download.html) / [Laragon](https://laragon.org/) )

## CLONE REPOSITORY

```bash
git clone https://github.com/yudhaginongpratidina/ahp-shoe-priority.git
cd ahp-shoe-priority
cd ahp-shoe-priority
```

## RUNNING COMMAND
```bash
npm install
```

## SETUP DATABASE

* Pastikan sudah membuat database dengan nama `ahp_shoe_priority` atau yang lain
* Setting Database (.env)

```env
DATABASE_URL="mysql://root:@localhost:3306/ahp_shoe_priority"
```

## RUNNING COMMAND

```bash
npx prisma db push
```

## RUNNING PROGRAM (DEVELOPMENT)

```bash
npm run dev
```

## VISIT PAGE

```text
http://localhost:3000
```