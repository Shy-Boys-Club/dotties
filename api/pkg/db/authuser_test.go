package db

import "testing"

func TestSetActiveIsSet(t *testing.T) {
	user := AuthUser{}

	user.SetActive()
	if user.LastActive == 0 {
		t.Errorf("expecting unix time stamp got 0 (default int64 value)")
	}
}

func TestSetAdmin(t *testing.T) {
	user := AuthUser{}
	user.SetAdmin(true)

	if !user.Admin {
		t.Errorf("expecting user to be admin got false")
	}
}

func TestUnsetAdmin(t *testing.T) {
	user := AuthUser{
		Admin: true,
	}

	user.SetAdmin(false)
	if user.Admin {
		t.Errorf("expecting user to NOT be admin but got true")
	}
}

func TestSetMod(t *testing.T) {
	user := AuthUser{}
	user.SetMod(true)

	if !user.Mod {
		t.Errorf("expecting user to be mod got false")
	}
}

func TestUnsetMod(t *testing.T) {
	user := AuthUser{
		Mod: true,
	}

	user.SetMod(false)
	if user.Mod {
		t.Errorf("expecting user to NOT be mod but got true")
	}
}
