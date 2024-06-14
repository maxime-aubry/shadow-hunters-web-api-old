import { Provider } from "@nestjs/common";

export interface IProvider {
    getProvider(): Provider;
}