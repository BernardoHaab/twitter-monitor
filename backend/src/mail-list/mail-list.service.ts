import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMailListDto } from './dto/create-mail-list.dto';
import { MailList, MailListDocument } from './schemas/mail-list.schema';

@Injectable()
export class MailListService {
  constructor(
    @InjectModel(MailList.name)
    private mailListModule: Model<MailListDocument>,
  ) {}

  async create({ emails }: CreateMailListDto) {
    const mailList = await this.findOne();

    if (!mailList) {
      return this.mailListModule.create({ emails });
    }

    await mailList.update({ emails }).exec();
    return mailList;
  }

  async findOne() {
    const mails = await this.mailListModule.find().exec();
    return mails.length ? mails[0] : null;
  }
}
