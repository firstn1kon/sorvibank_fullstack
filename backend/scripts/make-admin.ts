import 'dotenv/config';
import { Role } from '@prisma/client';
import { prisma } from '../src/models/prisma';

// Использование: npm run make-admin -- user@mail.ru
// Через API роль не меняется — первый (и любой) админ назначается только этим скриптом.
async function main() {
    const email = process.argv[2]?.toLocaleLowerCase();
    if (!email) {
        console.error('Укажите email: npm run make-admin -- user@mail.ru');
        process.exit(1);
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        console.error(`Пользователь ${email} не найден`);
        process.exit(1);
    }

    await prisma.user.update({ where: { id: user.id }, data: { role: Role.ADMIN } });
    console.log(`${email} теперь ADMIN`);
}

main().finally(() => prisma.$disconnect());
