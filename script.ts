import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	// const user = await prisma.user.create({
	// 	data: {
	// 		name: "Alice",
	// 		email: "alice@prisma.io",
	// 	},
	// });

	const users = await prisma.user.findMany();
	const user01 = await prisma.user.create({
		data: {
			name: "Bob",
			email: "bob@prisma.io",
			posts: {
				create: {
					title: "Hello World",
				},
			},
		},
	});
	const usersWithPosts = await prisma.user.findMany({
		include: {
			posts: true,
		},
	});
	console.dir(usersWithPosts, { depth: null });
	console.log(users);
	// console.log(user);
	console.log(user01);
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
