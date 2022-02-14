import { InjectQueue } from '@nestjs/bull';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { Queue } from 'bull';
import { Cache } from 'cache-manager';
import { TweetsService } from '../tweets.service';

@Injectable()
export class CheckNewTweetsTask {
  private CACHE_KEY = 'tweet-offset';
  private limit: number = 10;

  constructor(
    private tweetsService: TweetsService,
    @Inject(CACHE_MANAGER)
    private cache: Cache,
    @InjectQueue('emails')
    private emailsQueue: Queue,
  ) {}

  @Interval(5000)
  async handle() {
    console.log('Procurando Tweets.....');
    let offset = await this.cache.get<number>(this.CACHE_KEY);

    const tweets = await this.tweetsService.findAll({
      offset,
      limit: this.limit,
    });

    if (tweets.length === this.limit) {
      console.log('Achou mais tweets');

      await this.cache.set(this.CACHE_KEY, offset + this.limit, {
        ttl: 1 * 60 * 10,
      });

      this.emailsQueue.add({});
    }
  }
}
