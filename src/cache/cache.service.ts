import { CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";
import { Cache } from "cache-manager";
import { CacheExpireTimeEnum } from "./enums/cache-expire-time.enum";
import { StateType } from "../state/types/state.type";
import { CityType } from "../city/types/city.type";
import { ShownUserAnnouncementsType } from "../announcement/types/shown-user-announcements.type";

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  public async saveUserPhoneSecretCode(code: number, userId: number) {
    const key = this.getPhoneSecretKey(userId);

    await this.saveData(key, code, CacheExpireTimeEnum["5_MINUTE"]);
  }

  public async saveUserEmailSecretCode(code: number, userId: number) {
    const key = this.getEmailSecretKey(userId);

    await this.saveData(key, code, CacheExpireTimeEnum["5_MINUTE"]);
  }

  public async getUserEmailSecretCode(userId: number) {
    return this.getDataByKey(this.getEmailSecretKey(userId));
  }

  public async clearCache() {
    await this.cacheManager.reset();
  }

  private async saveData<Value>(
    key: string,
    value: Value,
    ttl: number
  ): Promise<void> {
    await this.cacheManager.set(key, value, { ttl });
  }

  private async getDataByKey<Response>(
    key: string
  ): Promise<Response | undefined> {
    return await this.cacheManager.get<Response>(key);
  }

  public async deleteDataByKey(key: string): Promise<void> {
    return await this.cacheManager.del(key);
  }

  private getPhoneSecretKey(userId: number) {
    return `User-Phone-Secret-Key-${userId}`;
  }

  private getEmailSecretKey(userId: number) {
    return `User-Email-Secret-Key-${userId}`;
  }

  private getStatesKey() {
    return `States-`;
  }

  private getCitiesKey(state: string) {
    return `Cities-${state}`;
  }

  public async saveStates(states: StateType[]): Promise<void> {
    await this.saveData(
      this.getStatesKey(),
      states,
      CacheExpireTimeEnum.FOREVER
    );
  }

  public async getStates(): Promise<Array<StateType>> {
    return this.getDataByKey(this.getStatesKey());
  }

  public async saveCitiesByState(
    state: string,
    cities: CityType[]
  ): Promise<void> {
    await this.saveData(
      this.getCitiesKey(state),
      cities,
      CacheExpireTimeEnum.FOREVER
    );
  }

  public async getCitiesByState(state: string): Promise<Array<CityType>> {
    return this.getDataByKey(this.getCitiesKey(state));
  }

  private getUserShownAnnouncementsKey(userId: number) {
    return `Shown-announcements-${userId}`;
  }

  public async getUserShownAnnouncements(
    userId: number
  ): Promise<ShownUserAnnouncementsType> {
    const key = this.getUserShownAnnouncementsKey(userId);

    return this.getDataByKey<ShownUserAnnouncementsType>(key);
  }

  public async updateUserShownAnnouncements(userId: number, data: string[]) {
    const key = this.getUserShownAnnouncementsKey(userId);

    const userShownAnnouncements = await this.getUserShownAnnouncements(userId);
  }

  public async saveUserShownAnnouncements(
    userId: number,
    data: ShownUserAnnouncementsType
  ) {
    const key = this.getUserShownAnnouncementsKey(userId);
    const ttl = data.expireTime
      ? data.expireTime
      : CacheExpireTimeEnum["2_HOURS"];

    const dataToSave = {
      ids: data.ids,
    };

    await this.saveData(key, data.ids, ttl);
  }
}
