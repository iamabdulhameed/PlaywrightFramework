export interface UserUIData {
    username: string,
    password: string
}

export class UserLoginUIBuilder {
    private data: UserUIData = { username: "cypresssuperadmin@layrins.com", password: "@Testing123" }

    public withUserEmail(email: string): UserLoginUIBuilder {
        this.data.username = email;
        return this;
    }

    public withUserPassword(password: string): UserLoginUIBuilder {
        this.data.password = password;
        return this;
    }

    public build(): UserUIData {
        return this.data;
    }
}