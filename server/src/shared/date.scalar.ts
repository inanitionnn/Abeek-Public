import { Scalar, CustomScalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';

@Scalar('Date', (type) => Date)
export class DateScalar implements CustomScalar<number, Date> {
  description = 'Date custom scalar type';

  parseValue(value: number): Date {
    return new Date(value); // value from the client
  }

  serialize(value: Date | string): number {
    if (typeof value === 'string') {
      const parsedDate = new Date(value);
      if (isNaN(parsedDate.getTime())) {
        throw new Error('Invalid Date string');
      }
      return parsedDate.getTime();
    } else if (value instanceof Date) {
      return value.getTime();
    } else {
      throw new Error('Invalid Date object');
    }
  }

  parseLiteral(ast: ValueNode): Date {
    if (ast.kind === Kind.INT) {
      return new Date(ast.value);
    }
    return null;
  }
}
