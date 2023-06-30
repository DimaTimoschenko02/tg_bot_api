import { InternalServerErrorException } from '@nestjs/common';
import {allowedEnvConst} from "../../custom-config/consts/allowed-envs.const";


export const getEnvPath = () => {
    const nodeEnv = `${process.env.NODE_ENV}`;

    if (!allowedEnvConst.includes(nodeEnv))
        throw new InternalServerErrorException(
            `${nodeEnv} parameter does not specified in .env file`
        );

    return `.env.${nodeEnv}`;
};
