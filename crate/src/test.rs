#![cfg(test)]

use crate::{trustify_ui, UI};
use rstest::rstest;

/// This test ensures that
#[rstest]
#[case::index_html_ejs("index.html.ejs")]
#[case::branding_strings_json("branding/strings.json")]
fn ensure_resources(#[case] res: &str) {
    let resources = trustify_ui(&UI::default()).expect("must be created");
    resources.get(res).expect("must exist");
}
