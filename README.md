# Problem Solving with TypeScript

## Blog Post (Bangla)

---

### প্রশ্ন ১: TypeScript-এ Interface এবং Type-এর মধ্যে কিছু পার্থক্য কী?

TypeScript-এ `interface` এবং `type` দুটোই অবজেক্টের আকার (shape) বর্ণনা করতে ব্যবহার করা হয়, কিন্তু এদের মধ্যে কিছু গুরুত্বপূর্ণ পার্থক্য রয়েছে।

**১. Declaration Merging (ঘোষণা একত্রীকরণ)**

`interface` একই নামে একাধিকবার ঘোষণা করা যায় এবং TypeScript সেগুলো স্বয়ংক্রিয়ভাবে একত্রিত করে নেয়। কিন্তু `type`-এর ক্ষেত্রে একই নাম দুইবার ব্যবহার করলে error আসে।

```typescript
interface User {
  name: string;
}
interface User {
  age: number;
}
// ফলাফল: User এখন { name: string; age: number }

type Product = { title: string };
type Product = { price: number }; // ❌ Error: Duplicate identifier
```

**২. Extending (বিস্তার করা)**

`interface` extends keyword ব্যবহার করে অন্য interface বা type থেকে বিস্তার করতে পারে। `type` intersection (`&`) operator ব্যবহার করে একই কাজ করে।

```typescript
interface Animal {
  name: string;
}
interface Dog extends Animal {
  breed: string;
}

type Animal2 = { name: string };
type Dog2 = Animal2 & { breed: string };
```

**৩. Primitive, Union এবং Tuple**

`type` দিয়ে primitive types, union types এবং tuple সরাসরি তৈরি করা যায়, কিন্তু `interface` দিয়ে তা সম্ভব নয়।

```typescript
type ID = string | number; // union type
type Coordinates = [number, number]; // tuple
type Name = string; // primitive alias

// interface দিয়ে এভাবে করা যায় না
```

**৪. কখন কোনটি ব্যবহার করবেন?**

সাধারণত object-এর shape বা class-এর contract বর্ণনা করতে `interface` ব্যবহার করা ভালো, কারণ এটি আরও বেশি object-oriented। আর union types, tuple বা primitive alias তৈরি করতে `type` ব্যবহার করা উচিত। যখন public API তৈরি করা হয়, তখন `interface` বেশি উপযুক্ত কারণ declaration merging সুবিধা দেয়।

---

### প্রশ্ন ৩: TypeScript-এ `any`, `unknown` এবং `never` type-এর পার্থক্য ব্যাখ্যা করুন।

**`any` type**

`any` হলো TypeScript-এর সবচেয়ে নমনীয় type। এই type ব্যবহার করলে TypeScript সেই variable-এর উপর কোনো type checking করে না। যেকোনো value `any` type-এর variable-এ রাখা যায় এবং সেটাকে যেকোনো type হিসেবে ব্যবহার করা যায়।

```typescript
let value: any = "hello";
value = 42;
value = true;
value.toUpperCase(); // কোনো error নেই, runtime-এ ভুল হতে পারে
```

`any` ব্যবহার করলে TypeScript-এর type safety নষ্ট হয়ে যায়, তাই এটি যতটা সম্ভব এড়িয়ে চলা উচিত।

**`unknown` type**

`unknown` হলো `any`-এর নিরাপদ বিকল্প। এই type-এ যেকোনো value রাখা যায়, কিন্তু সেই value ব্যবহার করার আগে অবশ্যই type checking করতে হবে। TypeScript নিশ্চিত না হলে `unknown` type-এর উপর কোনো operation করতে দেয় না।

```typescript
let value: unknown = "hello";

// value.toUpperCase(); // ❌ Error: Object is of type 'unknown'

if (typeof value === "string") {
  console.log(value.toUpperCase()); // ✅ এখন নিরাপদ
}
```

`unknown` ব্যবহার করলে type safety বজায় থাকে, তাই `any`-এর বদলে `unknown` ব্যবহার করা বেশি ভালো অভ্যাস।

**`never` type**

`never` এমন একটি type যা কখনো কোনো value ধারণ করে না। এটি সাধারণত দুটি ক্ষেত্রে দেখা যায়: এমন function যা কখনো return করে না (যেমন সবসময় error throw করে বা অসীম loop চালায়), এবং exhaustive type checking-এ।

```typescript
function throwError(message: string): never {
  throw new Error(message);
}

function processValue(value: string | number): string {
  if (typeof value === "string") return value.toUpperCase();
  if (typeof value === "number") return value.toString();
  
  const exhaustiveCheck: never = value; // value এখন never
  return exhaustiveCheck;
}
```

**সংক্ষিপ্ত তুলনা**

| বৈশিষ্ট্য | `any` | `unknown` | `never` |
|-----------|-------|-----------|---------|
| যেকোনো value রাখা যায় | ✅ | ✅ | ❌ |
| ব্যবহারের আগে type check | ❌ | ✅ | প্রযোজ্য নয় |
| Type safety | ❌ | ✅ | ✅ |
| কোথায় ব্যবহার | দ্রুত কাজে | বাইরের data | unreachable code |
# B6A1
