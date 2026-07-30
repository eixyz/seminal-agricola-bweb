import { createClient } from @supabase/supabase-js;
try {
  createClient(undefined, undefined);
  console.log(no-throw);
} catch (e) {
  console.log(throw:, e.message);
}
