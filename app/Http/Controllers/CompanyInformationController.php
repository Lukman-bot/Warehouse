<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\CompanyInformation;
use Illuminate\Http\Request;
use Inertia\Response;

class CompanyInformationController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('c_info', [
            'c_info' => CompanyInformation::all(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'corporate_name'      => 'required | string | max: 225',
            'city'                => 'required | string | max: 225',
            'address'             => 'required | string',
            'person_in_charge'    => 'required | string | max: 225',
            'contact_information' => 'required | string | max: 225'
        ]);

        $data = $request->only([
            'corporate_name',
            'city',
            'address',
            'person_in_charge',
            'contact_information'
        ]);

        CompanyInformation::create($data);

        return redirect()->route('c_info.index')->with('succsess', 'Data Berhasil Disimpan');
    }

    public function update(Request $request, CompanyInformation $company_information)
    {
        // dd($request->all());

        $request->validate([
            'corporate_name'      => 'required | string | max: 225',
            'city'                => 'required | string | max: 225',
            'address'             => 'required | string',
            'person_in_charge'    => 'required | string | max: 225',
            'contact_information' => 'required | string | max: 225'
        ]);

        $data = $request->only([
            'corporate_name',
            'city',
            'address',
            'person_in_charge',
            'contact_information'
        ]);

        $company_information->update($data);

        return redirect()->route('c_info.index')->with('succsess', 'Data Berhasil Diubah');
    }
}
