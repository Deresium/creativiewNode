import Roles from "./src/enums/roles";

declare module 'express-serve-static-core' {
	interface Request {
		userId: number,
		userRole: Roles
	}
}