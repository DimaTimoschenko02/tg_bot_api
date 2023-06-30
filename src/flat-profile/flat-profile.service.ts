import { Injectable } from "@nestjs/common";
import { FlatProfileRepository } from "./repositories/flat-profile.repository";
import { FlatProfile } from "./entities/flat-profile";

@Injectable()
export class FlatProfileService {
  constructor(private readonly flatProfileRepository: FlatProfileRepository) {}

  public async createProfile(
    profile?: Partial<FlatProfile>
  ): Promise<FlatProfile> {
    return await this.flatProfileRepository.save(profile);
  }
}
