// import { createClient } from 'redis';
const { createClient } = require("redis")
let client = {}, statusConnectRedis = {
    CONNECT: "connect",
    ERROR: "error",
    END: "end",
    RECONNECT: "reconnect"
}
const handleEnventConnect = async ({ connectRedist }) => {
    try {
        connectRedist.on(statusConnectRedis.CONNECT, () => {
            console.log("Redis Client Connected");
        })
        connectRedist.on(statusConnectRedis.ERROR, (err) => {
            console.log("error", err);
        })
        connectRedist.on(statusConnectRedis.RECONNECT, () => {
            console.log("RECONNECT");
        })
        connectRedist.on(statusConnectRedis.END, () => {
            console.log("END");
        })
        await connectRedist.connect();

    } catch (error) {
        console.log(error);
    }
}
const initRedis = async () => {
    const instanceRedis = createClient({
        // password: process.env.REDIS_PASSWORD,
        // socket: {
        //     host: 'redis-14715.c241.us-east-1-4.ec2.redns.redis-cloud.com',
        //     port: 14715
        // }
        url: "redis://default:iW3MFUZOyP4l8RJwxe7rZBEz2aWctct8@redis-14715.c241.us-east-1-4.ec2.redns.redis-cloud.com:14715"
    });
    client.instanceRedis = instanceRedis
    handleEnventConnect({ connectRedist: instanceRedis })
}
const setRedis = async ({ key, value, expireTime }) => {
    if (!key || !value) {
        throw Error(" key value missing")
    }
    console.log("set redis suucess", key, value, expireTime);
    await client.instanceRedis.set(key, JSON.stringify(value))
    await client.instanceRedis.expire(key, expireTime);
    //  await client.ttl('mykey');
    return
}
const getRedis = async (key) => {
    return await client.instanceRedis.get(key)

}
const deleteRedis = async ({ key }) => {
    try {
        if (!key) {
            throw Error(" key value missing")
        }
        client.instanceRedis.del(key)
    } catch (err) {
        return null;
    }



}
module.exports = { initRedis, getRedis, setRedis, deleteRedis }